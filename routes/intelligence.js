const express = require('express');
const { 
  findSymptomPatterns, 
  calculateRiskScore, 
  predictNextPeriod 
} = require('../services/analyzer');

const router = express.Router();

// 🧠 Get smart insights for a user
router.get('/insights/:userId', (req, res) => {
  try {
    const patterns = findSymptomPatterns(req.params.userId);
    
    res.json({
      success: true,
      data: {
        userId: req.params.userId,
        insights: patterns,
        analyzedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating insights",
      error: error.message
    });
  }
});

// 📊 Get risk score for a user
router.get('/risk-score/:userId', (req, res) => {
  try {
    const riskData = calculateRiskScore(req.params.userId);
    
    res.json({
      success: true,
      data: {
        userId: req.params.userId,
        riskScore: riskData,
        calculatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating risk score"
    });
  }
});

// 🔮 Predict next period
router.get('/predict-period/:userId', (req, res) => {
  try {
    const prediction = predictNextPeriod(req.params.userId);
    
    res.json({
      success: true,
      data: {
        userId: req.params.userId,
        periodPrediction: prediction,
        predictedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error predicting period"
    });
  }
});

// 📋 Get comprehensive report
router.get('/report/:userId', (req, res) => {
  try {
    const insights = findSymptomPatterns(req.params.userId);
    const riskScore = calculateRiskScore(req.params.userId);
    const periodPrediction = predictNextPeriod(req.params.userId);
    
    res.json({
      success: true,
      data: {
        userId: req.params.userId,
        report: {
          insights,
          riskScore,
          periodPrediction,
          summary: `Comprehensive health analysis for user ${req.params.userId}`,
          recommendations: [
            "Continue tracking symptoms daily",
            "Monitor patterns and triggers",
            "Consider lifestyle adjustments based on insights",
            "Consult healthcare provider if symptoms worsen"
          ]
        },
        generatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating report"
    });
  }
});

module.exports = router;