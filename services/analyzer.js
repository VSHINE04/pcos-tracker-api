const fs = require('fs');
const path = require('path');


const getSymptoms = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/symptoms.json'));
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const getPCOSKnowledge = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/pcos-knowledge.json'));
    return JSON.parse(data);
  } catch (error) {
    return { symptoms: {}, correlations: [] };
  }
};


const findSymptomPatterns = (userId) => {
  const symptoms = getSymptoms().filter(s => s.userId === userId);
  const patterns = [];
  
  if (symptoms.length < 3) {
    return [{
      type: "insufficient_data",
      title: "Need More Data",
      message: "Log symptoms for a few more days to see patterns",
      confidence: 0
    }];
  }
  
 
  const fatigueEntries = symptoms.filter(s => s.symptoms.includes('fatigue'));
  const poorSleepEntries = symptoms.filter(s => s.symptoms.includes('poor_sleep'));
  
  if (fatigueEntries.length >= 2 && poorSleepEntries.length >= 1) {
    patterns.push({
      type: "correlation",
      title: "Sleep-Fatigue Connection",
      message: `You have fatigue ${fatigueEntries.length} times and poor sleep ${poorSleepEntries.length} times`,
      confidence: 0.8,
      recommendation: "Focus on getting 7-8 hours of quality sleep"
    });
  }
  
 
  const allSymptoms = symptoms.flatMap(s => s.symptoms);
  const symptomCounts = {};
  
  allSymptoms.forEach(symptom => {
    symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
  });
  
  const mostCommon = Object.entries(symptomCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);
  
  if (mostCommon.length > 0) {
    patterns.push({
      type: "frequency",
      title: "Your Most Common Symptoms",
      message: `${mostCommon[0][0]} (${mostCommon[0][1]} times), ${mostCommon[1]?.[0] || 'none'} (${mostCommon[1]?.[1] || 0} times)`,
      confidence: 0.9,
      recommendation: "Consider tracking triggers for your most frequent symptoms"
    });
  }
  
  return patterns;
};


const calculateRiskScore = (userId) => {
  const symptoms = getSymptoms().filter(s => s.userId === userId);
  const knowledge = getPCOSKnowledge();
  
  if (symptoms.length === 0) {
    return {
      score: 0,
      level: "unknown",
      message: "No symptoms logged yet"
    };
  }
  
  let totalScore = 0;
  let symptomCount = 0;
  
  symptoms.forEach(entry => {
    entry.symptoms.forEach(symptom => {
      const weight = knowledge.symptoms[symptom]?.weight || 0.1;
      const severity = entry.severity[symptom] || 5;
      totalScore += (weight * severity);
      symptomCount++;
    });
  });
  
  const avgScore = totalScore / Math.max(symptomCount, 1);
  const finalScore = Math.min(avgScore * 2, 10); 
  
  let level, message;
  if (finalScore < 3) {
    level = "low";
    message = "Your symptoms seem manageable. Keep tracking!";
  } else if (finalScore < 6) {
    level = "moderate"; 
    message = "Some symptoms to watch. Consider lifestyle adjustments.";
  } else {
    level = "high";
    message = "Multiple symptoms detected. Consider consulting a healthcare provider.";
  }
  
  return {
    score: Math.round(finalScore * 10) / 10,
    level,
    message,
    factors: [...new Set(symptoms.flatMap(s => s.symptoms))].slice(0, 3)
  };
};


const predictNextPeriod = (userId) => {
  const symptoms = getSymptoms().filter(s => s.userId === userId);
  
 
  const periodSymptoms = symptoms.filter(s => 
    s.symptoms.includes('period') || 
    s.symptoms.includes('cramps') ||
    s.notes.toLowerCase().includes('period')
  );
  
  if (periodSymptoms.length < 2) {
    return {
      prediction: null,
      confidence: 0,
      message: "Need more cycle data to make predictions. Log period days!"
    };
  }
  

  const dates = periodSymptoms.map(s => new Date(s.date)).sort((a, b) => a - b);
  const gaps = [];
  
  for (let i = 1; i < dates.length; i++) {
    const diffTime = dates[i] - dates[i-1];
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    gaps.push(diffDays);
  }
  
  const avgCycle = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length || 28;
  const lastPeriod = dates[dates.length - 1];
  const nextPeriod = new Date(lastPeriod.getTime() + avgCycle * 24 * 60 * 60 * 1000);
  
  return {
    prediction: nextPeriod.toISOString().split('T')[0],
    confidence: gaps.length > 2 ? 0.8 : 0.6,
    message: `Based on your ${Math.round(avgCycle)}-day average cycle`,
    tips: [
      "Track symptoms 3-5 days before predicted date",
      "Keep period supplies ready",
      "Monitor mood and energy levels"
    ]
  };
};

module.exports = {
  findSymptomPatterns,
  calculateRiskScore,
  predictNextPeriod
};