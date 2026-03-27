const Chemical = require('../models/chemical'); // 'c' small rakha hai jaisa tune bataya tha

const analyzeIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;

        // 1. Validation: Agar user ne kuch nahi bheja
        if (!ingredients || ingredients.trim() === "") {
            return res.status(400).json({ 
                success: false, 
                message: "Please paste some ingredients to analyze!" 
            });
        }

        // 2. Formatting: Text ko clean karke array banana
        // "Aqua, SLS, PARABEN" -> ["aqua", "sls", "paraben"]
        const inputList = ingredients.split(',')
            .map(item => item.trim().toLowerCase());

        // 3. Database Search: Saare harmful chemicals mangwana
        const allHarmful = await Chemical.find();

        let detectedHarmful = [];
        let totalImpact = 0;

        // 4. Comparison Logic
        allHarmful.forEach(chem => {
            // Agar input mein database wala chemical name मौजूद hai
            if (inputList.includes(chem.name.toLowerCase())) {
                detectedHarmful.push({
                    name: chem.name,
                    effect: chem.sideEffects,
                    impact: chem.safetyScoreImpact
                });
                totalImpact += chem.safetyScoreImpact;
            }
        });

        // 5. Final Score Calculation (Min score 0 rakhenge)
        const safetyScore = Math.max(0, 100 - totalImpact);

        // 6. Response bhejna
        res.status(200).json({
            success: true,
            results: {
                score: safetyScore,
                foundCount: detectedHarmful.length,
                harmfulList: detectedHarmful,
                summary: safetyScore > 70 ? "Safe to use" : (safetyScore > 40 ? "Use with caution" : "Harmful/Toxic")
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