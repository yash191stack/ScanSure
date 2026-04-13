//structure of database
const mongoose = require('mongoose');

const chemicalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    sideEffects: { type: String, required: true },
    safetyScoreImpact: { type: Number, default: 20 },
    /** Reported harmfulness for this substance (75–98%). */
    harmfulnessPercent: { type: Number, min: 0, max: 100, default: 85 },
    /** Body systems / organs for which it is considered unsafe (plain text). */
    unsafeBodyParts: { type: String, default: 'Skin, eyes, liver' }
});

module.exports = mongoose.model('Chemical', chemicalSchema);
