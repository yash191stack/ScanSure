/**
 * Upserts 140+ harmful / high-caution chemicals into MongoDB.
 * Run: node scripts/seedChemicals.js   (from backend folder)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Chemical = require('../models/chemical');
const NAMES = require('./chemicalNamesSeed');

const BODY_PARTS = [
    'Skin, eyes, mucous membranes',
    'Liver, kidneys',
    'Reproductive system, endocrine system',
    'Nervous system, brain',
    'Respiratory system, lungs',
    'Digestive system, stomach, intestines',
    'Cardiovascular system, heart',
    'Thyroid, endocrine glands',
    'Immune system, lymphatic system',
    'Skin barrier, allergic contact sites',
    'Kidneys, urinary tract',
    'Liver, bile metabolism',
    'Skin, scalp, hair follicles',
    'Eyes, cornea, tear film',
    'Oral mucosa, gums'
];

async function main() {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scansure';
    await mongoose.connect(uri);
    console.log('Mongo connected, seeding', NAMES.length, 'chemicals…');

    let n = 0;
    for (let i = 0; i < NAMES.length; i += 1) {
        const name = NAMES[i];
        const harmfulnessPercent = 75 + (i % 24);
        const unsafeBodyParts = BODY_PARTS[i % BODY_PARTS.length];
        const safetyScoreImpact = 5 + (i % 9);
        await Chemical.updateOne(
            { name },
            {
                $set: {
                    name,
                    description:
                        'Commonly listed in cosmetics, cleaners, or personal care; flagged for consumer safety review.',
                    sideEffects:
                        'May cause irritation, sensitization, or organ-system concern depending on concentration, formulation, and exposure.',
                    safetyScoreImpact,
                    harmfulnessPercent,
                    unsafeBodyParts
                }
            },
            { upsert: true }
        );
        n += 1;
        if (n % 50 === 0) {
            console.log('…', n);
        }
    }
    console.log('Done. Upserted', n, 'chemicals.');
    await mongoose.disconnect();
    process.exit(0);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
