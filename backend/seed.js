const mongoose= require('mongoose');
require('dotenv').config();
const Chemical=require('./models/chemical');


const harmfulChemicals=[
    { name: "Paraben", sideEffects: "Hormone disruption, skin irritation", safetyScoreImpact: 25 },
    { name: "SLS", sideEffects: "Eye irritation, dry skin, scalp issues", safetyScoreImpact: 15 },
    { name: "Sulfate", sideEffects: "Strips natural oils, causes dryness", safetyScoreImpact: 10 },
    { name: "Formaldehyde", sideEffects: "Highly toxic, potential carcinogen", safetyScoreImpact: 40 },
    { name: "Phthalates", sideEffects: "Endocrine disruption, reproductive issues", safetyScoreImpact: 30 },
    { name: "Triclosan", sideEffects: "Thyroid issues, bacterial resistance", safetyScoreImpact: 20 },
    { name: "Synthetic Fragrance", sideEffects: "Allergies, respiratory issues", safetyScoreImpact: 15 },
    { name: "Toluene", sideEffects: "Immune system toxicity, dizziness", safetyScoreImpact: 35 },
    { name: "Polyethylene Glycol", sideEffects: "Skin penetration enhancer, contamination risk", safetyScoreImpact: 10 },
    { name: "Oxybenzone", sideEffects: "Allergic reactions, coral reef damage", safetyScoreImpact: 25 }
];
const seedDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB for seeding......");

        //sbse phele hmne niche waali command se puarana data delete krre h taaki pichla koi bhi data database m present na ho
        await Chemical.deleteMany({});

        //ab hum niche waali command se nya data insert krre hai database main

        await Chemical.insertMany(harmfulChemicals);

        console.log("Database updated successfully.....");
        process.exit();
    }
    catch(error){
        console.log("Error seeding DB:", error);
        process.exit(1);
    }
};

seedDB();