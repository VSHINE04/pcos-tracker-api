const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper functions
const getSymptoms = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/symptoms.json'));
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveSymptoms = (symptoms) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/symptoms.json'),
    JSON.stringify(symptoms, null, 2)
  );
};

// Log daily symptoms
router.post('/log', (req, res) => {
  try {
    const { userId, date, symptoms, severity, notes } = req.body;
    
    // Validate required fields
    if (!userId || !date || !symptoms || !severity) {
      return res.status(400).json({
        success: false,
        message: "userId, date, symptoms, and severity are required"
      });
    }
    
    const allSymptoms = getSymptoms();
    
    // Create new symptom entry
    const newSymptom = {
      id: `sym${Date.now()}`,
      userId,
      date,
      symptoms,
      severity,
      notes: notes || "",
      loggedAt: new Date().toISOString()
    };
    
    allSymptoms.push(newSymptom);
    saveSymptoms(allSymptoms);
    
    res.json({
      success: true,
      message: "Symptoms logged successfully!",
      symptom: newSymptom
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging symptoms",
      error: error.message
    });
  }
});

// Get symptom history 
router.get('/history/:userId', (req, res) => {
  try {
    const allSymptoms = getSymptoms();
    const userSymptoms = allSymptoms.filter(s => s.userId === req.params.userId);
    
    // Sort by date 
    userSymptoms.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json({
      success: true,
      symptoms: userSymptoms,
      total: userSymptoms.length
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching symptom history"
    });
  }
});

// for a specific date
router.get('/date/:userId/:date', (req, res) => {
  try {
    const allSymptoms = getSymptoms();
    const daySymptoms = allSymptoms.filter(s => 
      s.userId === req.params.userId && s.date === req.params.date
    );
    
    res.json({
      success: true,
      symptoms: daySymptoms
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching symptoms for date"
    });
  }
});

module.exports = router;