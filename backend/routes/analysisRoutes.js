const express = require('express');
const router = express.Router();
const { analyzeIngredients } = require('../controllers/analysisController');

// route: POST --> /api/analyze
router.post('/analyze', analyzeIngredients);

module.exports = router;
