const express=require('express');
const router=express.Router();
const {analyzeIngrediants}= require('/controllers/analysisController');

//route:post -->api/analyze

router.post('/analyze',analyzeIngrediants);



module.exports=router;
