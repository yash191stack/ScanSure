const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chemical = require('../models/chemical');

/** Models your key can call (from Google ListModels). */
function fetchGeminiModelIds(apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    return new Promise((resolve) => {
        https
            .get(url, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        const names = (data.models || [])
                            .filter((m) =>
                                (m.supportedGenerationMethods || []).includes('generateContent')
                            )
                            .map((m) => String(m.name || '').replace(/^models\//, ''))
                            .filter(Boolean);
                        resolve(names);
                    } catch {
                        resolve([]);
                    }
                });
            })
            .on('error', () => resolve([]));
    });
}

function rankGeminiModels(available) {
    const prefer = [
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-2.0-flash-lite',
        'gemini-2.0-flash-001',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-1.5-pro'
    ];
    const avail = new Set(available);
    const out = [];
    prefer.forEach((p) => {
        if (avail.has(p)) {
            out.push(p);
        }
    });
    const skip = /tts|embedding|embed|image|audio|live|robot|a4b-it$/i;
    available.forEach((id) => {
        if (out.includes(id)) {
            return;
        }
        if (/^gemini/i.test(id) && !skip.test(id)) {
            out.push(id);
        }
    });
    return out;
}

async function findMatchedChemicalDocuments(ingredients) {
    const inputList = ingredients
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
    const combinedLower = inputList.join(' ').toLowerCase();
    if (!combinedLower) {
        return [];
    }
    try {
        const all = await Chemical.find().lean();
        return all.filter((chem) => {
            const n = chem.name.toLowerCase();
            return inputList.some((i) => i.toLowerCase().includes(n)) || combinedLower.includes(n);
        });
    } catch (e) {
        console.error('Chemical DB read failed:', e);
        return [];
    }
}

function harmfulDetailFromDbDoc(chem) {
    const hpRaw =
        typeof chem.harmfulnessPercent === 'number'
            ? chem.harmfulnessPercent
            : 75 + (chem.name.length % 24);
    const harmfulnessPercent = Math.min(98, Math.max(75, Math.round(hpRaw)));
    const unsafeBodyParts = chem.unsafeBodyParts || 'Skin, eyes, liver';
    return {
        name: chem.name,
        harmfulnessPercent,
        unsafeBodyParts,
        sideEffects: chem.sideEffects,
        description: chem.description || '',
        warningMessage: 'Ye chemical safe nahi hai.',
        warningDetail: `Ye in body parts / systems ke liye safe nahi hai: ${unsafeBodyParts}.`
    };
}

function summaryFromScore(score) {
    if (score < 40) {
        return 'High risk — harmful profile';
    }
    if (score < 70) {
        return 'Caution — review ingredients';
    }
    return 'Lower concern for listed database flags';
}

function ingredientDetailRow(d) {
    return {
        name: d.name,
        usage: d.description || 'Database-flagged chemical in consumer products.',
        harms: `${d.harmfulnessPercent}% harmful — ${d.sideEffects}`,
        longTermEffect: `${d.warningMessage} ${d.warningDetail}`,
        foundIn: d.unsafeBodyParts
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 8)
    };
}

function buildResultsBlock(safetyScore, harmfulDetails, message) {
    const ingredientsDetail = harmfulDetails.map(ingredientDetailRow);
    const names = harmfulDetails.map((d) => d.name);
    return {
        score: safetyScore,
        foundCount: harmfulDetails.length,
        harmfulList: names,
        harmfulDetails,
        summary: summaryFromScore(safetyScore),
        message,
        report:
            ingredientsDetail.length > 0
                ? {
                      ingredientsDetail,
                      generalInsights:
                          names.length > 0
                              ? `Ye chemicals safe nahi hain: ${names.join(', ')}. Database ke anusaar har match ke liye nuksan ${harmfulDetails
                                    .map((h) => `${h.name} (~${h.harmfulnessPercent}%)`)
                                    .join('; ')} — body systems jinke liye safe nahi: details cards par dekho.`
                              : 'Koi flagged chemical match nahi mila.'
                  }
                : undefined
    };
}

/** Offline: DB + small static keyword list (same response shape as AI path). */
async function analyzeIngredientsOffline(ingredients) {
    const inputList = ingredients
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
    const combinedLower = inputList.join(' ').toLowerCase();

    const matched = await findMatchedChemicalDocuments(ingredients);
    let totalImpact = 0;
    const harmfulDetails = matched.map((chem) => {
        totalImpact += Number(chem.safetyScoreImpact) || 10;
        return harmfulDetailFromDbDoc(chem);
    });

    const staticHints = [
        { match: 'paraben', label: 'Parabens', impact: 15 },
        { match: 'sodium lauryl sulfate', label: 'Sodium Lauryl Sulfate (SLS)', impact: 14 },
        { match: 'sls', label: 'Sodium Lauryl Sulfate (SLS)', impact: 14 },
        { match: 'formaldehyde', label: 'Formaldehyde releasers', impact: 18 },
        { match: 'phthalate', label: 'Phthalates', impact: 16 },
        { match: 'triclosan', label: 'Triclosan', impact: 14 },
        { match: 'hydroquinone', label: 'Hydroquinone', impact: 16 }
    ];
    const namesSoFar = new Set(harmfulDetails.map((d) => d.name.toLowerCase()));
    staticHints.forEach((h) => {
        if (!combinedLower.includes(h.match)) {
            return;
        }
        const alreadyFromDb = harmfulDetails.some((d) => d.name.toLowerCase().includes(h.match));
        if (alreadyFromDb || namesSoFar.has(h.label.toLowerCase())) {
            return;
        }
        namesSoFar.add(h.label.toLowerCase());
        totalImpact += h.impact;
        harmfulDetails.push({
            name: h.label,
            harmfulnessPercent: Math.min(98, Math.max(75, 75 + (h.match.length % 24))),
            unsafeBodyParts: 'Skin, eyes, respiratory system',
            sideEffects: 'Class-level caution for this ingredient family in consumer products.',
            description: 'Matched from offline keyword list.',
            warningMessage: 'Ye chemical safe nahi hai.',
            warningDetail: 'Ye in body parts / systems ke liye safe nahi hai: Skin, eyes, respiratory system.'
        });
    });

    const safetyScore = Math.max(0, 100 - Math.min(100, totalImpact));
    const harmfulChemicals = harmfulDetails.map((d) => d.name);
    return { safetyScore, harmfulChemicals, harmfulDetails };
}

async function mergeGeminiWithDatabase(ingredients, geminiScore, geminiHarmfulNames) {
    const matched = await findMatchedChemicalDocuments(ingredients);
    const dbDetails = matched.map(harmfulDetailFromDbDoc);
    const namesLower = new Set(dbDetails.map((d) => d.name.toLowerCase()));
    const extras = geminiHarmfulNames
        .filter((n) => typeof n === 'string' && n.trim() && !namesLower.has(n.trim().toLowerCase()))
        .map((name) => {
            const t = name.trim();
            return {
                name: t,
                harmfulnessPercent: Math.min(98, Math.max(75, 75 + (t.length % 24))),
                unsafeBodyParts: 'Skin, eyes, liver (AI-detected — confirm on product label)',
                sideEffects: 'Generative model flag — verify with independent sources.',
                description: 'Flagged by AI from ingredient text.',
                warningMessage: 'Ye chemical safe nahi hai.',
                warningDetail:
                    'Ye in body parts / systems ke liye safe nahi hai: Skin, eyes, liver (AI estimate — confirm on label).'
            };
        });
    const harmfulDetails = [...dbDetails, ...extras];
    const totalImpact = matched.reduce((s, c) => s + (Number(c.safetyScoreImpact) || 10), 0);
    const dbScore = Math.max(0, 100 - Math.min(100, totalImpact));
    const g = Number(geminiScore);
    const scoreNum = Number.isFinite(g) ? Math.min(100, Math.max(0, Math.round(g))) : 70;
    const safetyScore = matched.length ? Math.min(scoreNum, dbScore) : scoreNum;
    return { safetyScore, harmfulDetails };
}

function geminiMessage(err) {
    return String(err?.message || '');
}

/** Whether to try the next model name for this error */
function shouldTryNextGeminiModel(err) {
    const msg = geminiMessage(err);
    const s = err?.status;

    if (/API[_ ]?KEY|API_KEY_INVALID|PERMISSION_DENIED|not valid|invalid api key/i.test(msg)) {
        return false;
    }
    if (s === 401 || s === 403) {
        return false;
    }
    return (
        s == null ||
        s === 400 ||
        s === 404 ||
        s === 408 ||
        s === 429 ||
        s === 500 ||
        s === 502 ||
        s === 503
    );
}

const analyzeIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.trim() === "") {
            return res.status(400).json({ 
                success: false, 
                message: "Please paste some ingredients to analyze!" 
                
            });
        }
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Missing GEMINI_API_KEY in environment variables."
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const staticFallbackModels = [
            'gemini-2.5-flash',
            'gemini-2.5-pro',
            'gemini-2.0-flash-lite',
            'gemini-2.0-flash-001',
            'gemini-2.0-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro'
        ];

        const listed = await fetchGeminiModelIds(process.env.GEMINI_API_KEY);
        const modelCandidates = rankGeminiModels(
            listed.length ? listed : staticFallbackModels
        );

        const generationConfigJson = {
            temperature: 0.2,
            responseMimeType: 'application/json'
        };
        const generationConfigPlain = {
            temperature: 0.2
        };

        const prompt = `
Analyze this ingredient list and return ONLY valid JSON:
${ingredients}

Required JSON format:
{
  "safetyScore": number,
  "harmfulChemicals": ["chemical name 1", "chemical name 2"]
}

Rules:
- "safetyScore" must be an integer from 0 to 100.
- "harmfulChemicals" must contain only risky ingredients present in the provided list.
- If no harmful chemicals are found, return an empty array.
- Do not include markdown, explanations, or extra keys.
        `.trim();

        let aiResult = null;
        let lastModelError = null;

        const runGeminiPass = async (generationConfig) => {
            for (const modelName of modelCandidates) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName, generationConfig });
                    const result = await model.generateContent(prompt);
                    return { ok: true, result, lastErr: null };
                } catch (modelError) {
                    lastModelError = modelError;
                    if (!shouldTryNextGeminiModel(modelError)) {
                        return { ok: false, result: null, lastErr: modelError };
                    }
                }
            }
            return { ok: true, result: null, lastErr: lastModelError };
        };

        try {
            let pass = await runGeminiPass(generationConfigJson);
            if (!pass.ok) {
                throw pass.lastErr;
            }
            aiResult = pass.result;

            if (!aiResult) {
                pass = await runGeminiPass(generationConfigPlain);
                if (!pass.ok) {
                    throw pass.lastErr;
                }
                aiResult = pass.result;
            }
        } catch (modelRequestError) {
            const statusCode = modelRequestError?.status;
            const msg = geminiMessage(modelRequestError);

            if (statusCode === 401 || statusCode === 403 || /API[_ ]?KEY|PERMISSION_DENIED|not valid|invalid api key/i.test(msg)) {
                return res.status(401).json({
                    success: false,
                    message: "Gemini API key is invalid or not allowed. Create a key in Google AI Studio and enable the Generative Language API for the project."
                });
            }
            console.error("Gemini Request Error:", statusCode, modelRequestError);
            const { safetyScore, harmfulChemicals, harmfulDetails } = await analyzeIngredientsOffline(ingredients);
            return res.status(200).json({
                success: true,
                safetyScore,
                harmfulChemicals,
                harmfulDetails,
                fallback: true,
                geminiError: true,
                results: buildResultsBlock(
                    safetyScore,
                    harmfulDetails,
                    "Offline analysis (Gemini request failed — check API key and billing)."
                )
            });
        }

        if (!aiResult) {
            console.warn(
                "Gemini unavailable after JSON + plain passes:",
                lastModelError?.status,
                geminiMessage(lastModelError).slice(0, 200)
            );
            const { safetyScore, harmfulChemicals, harmfulDetails } = await analyzeIngredientsOffline(ingredients);
            const quotaExceeded = lastModelError?.status === 429;
            const msg = quotaExceeded
                ? "Offline analysis (Gemini quota exceeded — enable billing in Google Cloud for AI scoring)."
                : "Offline analysis (no Gemini model accepted this request — JSON mode or models may be restricted for your key).";
            return res.status(200).json({
                success: true,
                safetyScore,
                harmfulChemicals,
                harmfulDetails,
                fallback: true,
                quotaExceeded,
                results: buildResultsBlock(safetyScore, harmfulDetails, msg)
            });
        }
        let rawText;
        try {
            rawText = aiResult.response.text().trim();
        } catch (textErr) {
            console.error("Gemini response text error:", textErr);
            return res.status(422).json({
                success: false,
                message: "Gemini blocked or could not return text for this input. Try a shorter ingredient list or rephrase."
            });
        }
        const jsonText = rawText
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/, '');

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonText);
        } catch (parseError) {
            console.error("Gemini JSON Parse Error:", parseError, rawText);
            return res.status(502).json({
                success: false,
                message: "Gemini returned an invalid JSON response."
            });
        }

        const parsedScore = Number(parsedResponse.safetyScore);
        const safetyScore = Number.isFinite(parsedScore)
            ? Math.min(100, Math.max(0, Math.round(parsedScore)))
            : 0;
        const geminiHarmfulNames = Array.isArray(parsedResponse.harmfulChemicals)
            ? parsedResponse.harmfulChemicals.filter(
                (chemical) => typeof chemical === 'string' && chemical.trim() !== ""
            )
            : [];

        const { safetyScore: mergedScore, harmfulDetails } = await mergeGeminiWithDatabase(
            ingredients,
            safetyScore,
            geminiHarmfulNames
        );
        const harmfulChemicals = harmfulDetails.map((d) => d.name);

        res.status(200).json({
            success: true,
            safetyScore: mergedScore,
            harmfulChemicals,
            harmfulDetails,
            results: buildResultsBlock(mergedScore, harmfulDetails, "Dynamic AI analysis completed (Gemini + database cross-check).")
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Analysis failed unexpectedly. Please try again."
        });
    }
};

module.exports = { analyzeIngredients };