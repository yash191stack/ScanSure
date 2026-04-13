const Chemical = require('../models/chemical');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API (Optional fallback if key is missing)
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

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

        // 2. AI Analysis (using Gemini)
        let aiReport = null;
        if (genAI) {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                
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
                    
                    Return the response in STRICTURE JSON format as follows:
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

                const result = await model.generateContent(prompt);
                const responseText = result.response.text();
                
                // Clean the response text to ensure it's valid JSON
                const cleanJson = responseText.replace(/```json|```/g, "").trim();
                aiReport = JSON.parse(cleanJson);
            } catch (aiError) {
                console.error("Gemini AI Error:", aiError);
                // Continue without AI report if it fails
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
                message: aiReport ? "Deep AI Analysis Completed" : "Database Analysis Completed (AI Offline)"
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