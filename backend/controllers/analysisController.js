const Chemical = require('../models/chemical');

// We use fetch if available (Node 18+), else we can use a small polyfill or fallback.
// Since we can't install new packages easily, we'll use the native 'https' module for maximum compatibility.
const https = require('https');

const analyzeIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.trim() === "") {
            return res.status(400).json({ 
                success: false, 
                message: "Please paste some ingredients to analyze!" 
                
            });
        }

        const inputList = ingredients.split(',')
            .map(item => item.trim());

        // 1. Local Database Check (for quick harmful detection)
        const allHarmful = await Chemical.find();
        let detectedHarmful = [];
        let totalImpact = 0;

        allHarmful.forEach(chem => {
            if (inputList.some(i => i.toLowerCase().includes(chem.name.toLowerCase()))) {
                detectedHarmful.push({
                    name: chem.name,
                    effect: chem.sideEffects,
                    impact: chem.safetyScoreImpact
                });
                totalImpact += chem.safetyScoreImpact;
            }
        });

        // 2. AI Analysis (using OpenAI)
        let aiReport = null;
        if (process.env.OPENAI_API_KEY) {
            try {
                const prompt = `
                    You are a professional toxicologist and food safety expert. 
                    Analyze the following list of ingredients: ${ingredients}.
                    
                    For each ingredient, provide:
                    1. What it is used for in products.
                    2. Typical products or categories where it is found.
                    3. Potential harms or side effects (short-term and long-term).
                    4. A specific insight: "What happens if consumed/used daily for 10-20 days?".
                    5. Safer alternatives.
                    
                    Also, provide an overall safety score (0-100) and a summary.
                    
                    Return the response in STRICT JSON format as follows:
                    {
                        "score": number,
                        "summary": "string",
                        "ingredientsDetail": [
                            {
                                "name": "string",
                                "usage": "string",
                                "foundIn": ["product1", "product2"],
                                "harms": "string",
                                "longTermEffect": "string",
                                "alternatives": "string"
                            }
                        ],
                        "generalInsights": "string"
                    }
                `;

                aiReport = await new Promise((resolve, reject) => {
                    const data = JSON.stringify({
                        model: "gpt-4o",
                        messages: [
                            { role: "system", content: "You are a toxicologist that outputs only JSON." },
                            { role: "user", content: prompt }
                        ],
                        response_format: { type: "json_object" },
                        temperature: 0.7
                    });

                    const options = {
                        hostname: 'api.openai.com',
                        port: 443,
                        path: '/v1/chat/completions',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                            'Content-Length': data.length
                        }
                    };

                    const reqOpenAI = https.request(options, (resOpenAI) => {
                        let body = '';
                        resOpenAI.on('data', (chunk) => body += chunk);
                        resOpenAI.on('end', () => {
                            try {
                                const response = JSON.parse(body);
                                if (response.choices && response.choices[0]) {
                                    resolve(JSON.parse(response.choices[0].message.content));
                                } else {
                                    console.error("OpenAI Invalid Response:", response);
                                    resolve(null);
                                }
                            } catch (e) {
                                console.error("JSON Parse Error from OpenAI:", e);
                                resolve(null);
                            }
                        });
                    });

                    reqOpenAI.on('error', (e) => {
                        console.error("OpenAI Request Error:", e);
                        resolve(null);
                    });

                    reqOpenAI.write(data);
                    reqOpenAI.end();
                });

            } catch (aiError) {
                console.error("AI Analysis Error:", aiError);
            }
        }

        const safetyScore = aiReport ? aiReport.score : Math.max(0, 100 - totalImpact);

        res.status(200).json({
            success: true,
            results: {
                score: safetyScore,
                foundCount: detectedHarmful.length,
                harmfulList: detectedHarmful,
                summary: aiReport ? aiReport.summary : (safetyScore > 70 ? "Safe to use" : (safetyScore > 40 ? "Use with caution" : "Harmful/Toxic")),
                report: aiReport || null,
                message: aiReport ? "Deep AI Analysis Completed (OpenAI)" : "Database Analysis Completed (AI Offline)"
            }
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Backend analysis failed. Check server logs." 
        });
    }
};

module.exports = { analyzeIngredients };