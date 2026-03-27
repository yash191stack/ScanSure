//structure of database
const mongoose = require('mongoose');

const chemicalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "Paraben"
    description: { type: String }, 
    sideEffects: { type: String, required: true },       // e.g., "Skin irritation"
    safetyScoreImpact: { type: Number, default: 20 }      // Ek harmful chemical milne par kitne % kam honge
});

module.exports = mongoose.model('Chemical', chemicalSchema);
