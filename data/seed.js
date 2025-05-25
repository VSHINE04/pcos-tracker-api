const fs = require('fs');
const path = require('path');

// Sample users data
const users = [
  {
    id: "user1",
    name: "Priya",
    age: 25,
    weight: 65,
    height: 160,
    avgCycleLength: 32,
    registeredDate: "2025-04-01"
  },
  {
    id: "user2", 
    name: "Ananya",
    age: 28,
    weight: 70,
    height: 165,
    avgCycleLength: 28,
    registeredDate: "2025-05-05"
  }
];

// 2 months of detailed tracking for user1
const symptoms = [
  // April 2025 First cycle
  {
    id: "sym1",
    userId: "user1",
    date: "2025-04-01",
    symptoms: ["period", "cramps", "mood_swings"],
    severity: { period: 8, cramps: 7, mood_swings: 6 },
    notes: "Heavy flow day 1, painful cramps, feeling emotional"
  },
  {
    id: "sym2",
    userId: "user1",
    date: "2025-04-02",
    symptoms: ["period", "fatigue", "bloating"],
    severity: { period: 7, fatigue: 8, bloating: 6 },
    notes: "Still heavy flow, very tired, stomach discomfort"
  },
  {
    id: "sym3",
    userId: "user1",
    date: "2025-04-03",
    symptoms: ["period", "fatigue"],
    severity: { period: 5, fatigue: 6 },
    notes: "Flow reducing, less tired than yesterday"
  },
  {
    id: "sym4",
    userId: "user1",
    date: "2025-04-04",
    symptoms: ["period", "acne"],
    severity: { period: 3, acne: 5 },
    notes: "Light flow, noticed breakouts on chin"
  },
  {
    id: "sym5",
    userId: "user1",
    date: "2025-04-05",
    symptoms: ["acne", "mood_swings"],
    severity: { acne: 6, mood_swings: 4 },
    notes: "Period ended, but acne getting worse, mood stabilizing"
  },
  {
    id: "sym6",
    userId: "user1",
    date: "2025-04-08",
    symptoms: ["poor_sleep", "acne"],
    severity: { poor_sleep: 7, acne: 7 },
    notes: "Couldn't sleep well, 4 hours only. Acne on forehead too"
  },
  {
    id: "sym7",
    userId: "user1",
    date: "2025-04-09",
    symptoms: ["fatigue", "mood_swings"],
    severity: { fatigue: 9, mood_swings: 7 },
    notes: "Extremely tired after poor sleep, irritable all day"
  },
  {
    id: "sym8",
    userId: "user1",
    date: "2025-04-12",
    symptoms: ["weight_gain", "bloating"],
    severity: { weight_gain: 6, bloating: 8 },
    notes: "Gained 2kg this week, feeling very bloated after meals"
  },
  {
    id: "sym9",
    userId: "user1",
    date: "2025-04-15",
    symptoms: ["hair_loss", "acne"],
    severity: { hair_loss: 5, acne: 4 },
    notes: "Noticed more hair in shower drain, acne improving"
  },
  {
    id: "sym10",
    userId: "user1",
    date: "2025-04-18",
    symptoms: ["irregular_periods", "mood_swings"],
    severity: { irregular_periods: 6, mood_swings: 5 },
    notes: "Expected period but nothing, feeling anxious about it"
  },
  {
    id: "sym11",
    userId: "user1",
    date: "2025-04-22",
    symptoms: ["poor_sleep", "stress"],
    severity: { poor_sleep: 8, stress: 9 },
    notes: "Work deadline stress, only 3 hours sleep, feeling overwhelmed"
  },
  {
    id: "sym12",
    userId: "user1",
    date: "2025-04-23",
    symptoms: ["fatigue", "mood_swings", "stress"],
    severity: { fatigue: 10, mood_swings: 8, stress: 8 },
    notes: "Worst day in weeks, completely exhausted, cried twice"
  },
  {
    id: "sym13",
    userId: "user1",
    date: "2025-04-28",
    symptoms: ["bloating", "weight_gain"],
    severity: { bloating: 7, weight_gain: 7 },
    notes: "Clothes feeling tight, bloated after every meal"
  },

  // May 2025 - Second cycle (delayed)
  {
    id: "sym14",
    userId: "user1",
    date: "2025-05-03",
    symptoms: ["period", "cramps", "relief"],
    severity: { period: 6, cramps: 5, relief: 8 },
    notes: "Finally! Period came 5 days late, manageable cramps"
  },
  {
    id: "sym15",
    userId: "user1",
    date: "2025-05-04",
    symptoms: ["period", "fatigue"],
    severity: { period: 7, fatigue: 6 },
    notes: "Heavier flow today, tired but not as bad as last time"
  },
  {
    id: "sym16",
    userId: "user1",
    date: "2025-05-05",
    symptoms: ["period", "mood_swings"],
    severity: { period: 5, mood_swings: 4 },
    notes: "Flow decreasing, mood much better than April cycle"
  },
  {
    id: "sym17",
    userId: "user1",
    date: "2025-05-06",
    symptoms: ["period", "acne"],
    severity: { period: 3, acne: 6 },
    notes: "Light flow, new breakouts starting on jawline"
  },
  {
    id: "sym18",
    userId: "user1",
    date: "2025-05-10",
    symptoms: ["good_sleep", "energy"],
    severity: { good_sleep: 9, energy: 8 },
    notes: "Great 8-hour sleep, woke up refreshed and energetic!"
  },
  {
    id: "sym19",
    userId: "user1",
    date: "2025-05-12",
    symptoms: ["poor_sleep", "stress"],
    severity: { poor_sleep: 6, stress: 7 },
    notes: "Client presentation tomorrow, nervous, tossed and turned"
  },
  {
    id: "sym20",
    userId: "user1",
    date: "2025-05-13",
    symptoms: ["fatigue", "mood_swings"],
    severity: { fatigue: 7, mood_swings: 6 },
    notes: "Tired from poor sleep, presentation went well though"
  },
  {
    id: "sym21",
    userId: "user1",
    date: "2025-05-16",
    symptoms: ["bloating", "weight_gain"],
    severity: { bloating: 8, weight_gain: 6 },
    notes: "Ate too much processed food this week, feeling it now"
  },
  {
    id: "sym22",
    userId: "user1",
    date: "2025-05-18",
    symptoms: ["acne", "hair_loss"],
    severity: { acne: 7, hair_loss: 6 },
    notes: "Acne flare-up on both cheeks, more hair fall noticed"
  },
  {
    id: "sym23",
    userId: "user1",
    date: "2025-05-20",
    symptoms: ["fatigue", "mood_swings"],
    severity: { fatigue: 7, mood_swings: 6 },
    notes: "Very tired today, felt emotional watching a movie"
  },
  {
    id: "sym24",
    userId: "user1",
    date: "2025-05-21",
    symptoms: ["acne", "bloating"],
    severity: { acne: 5, bloating: 8 },
    notes: "Skin breakout continuing, stomach issues after lunch"
  },
  {
    id: "sym25",
    userId: "user1",
    date: "2025-05-22", 
    symptoms: ["poor_sleep", "fatigue"],
    severity: { poor_sleep: 9, fatigue: 9 },
    notes: "Insomnia - only 2 hours sleep, extremely tired all day"
  },
  {
    id: "sym26",
    userId: "user1",
    date: "2025-05-23",
    symptoms: ["fatigue", "mood_swings", "stress"],
    severity: { fatigue: 10, mood_swings: 9, stress: 8 },
    notes: "Worst fatigue ever, emotional breakdown, high stress levels"
  },
  {
    id: "sym27",
    userId: "user1",
    date: "2025-05-24",
    symptoms: ["recovery", "good_sleep"],
    severity: { recovery: 7, good_sleep: 8 },
    notes: "Better day, got 9 hours sleep, feeling more like myself"
  },
  {
    id: "sym28",
    userId: "user1",
    date: "2025-05-25",
    symptoms: ["energy", "positive_mood"],
    severity: { energy: 8, positive_mood: 9 },
    notes: "Great day! High energy, positive mindset, went for a walk"
  },

  // User2 data (minimal for comparison)
  {
    id: "sym29",
    userId: "user2",
    date: "2025-05-20",
    symptoms: ["fatigue", "mood_swings"],
    severity: { fatigue: 7, mood_swings: 6 },
    notes: "Very tired today, felt emotional"
  },
  {
    id: "sym30",
    userId: "user2",
    date: "2025-05-21",
    symptoms: ["acne", "bloating"],
    severity: { acne: 5, bloating: 8 },
    notes: "Skin breakout, stomach issues"
  }
];

const pcosData = {
  symptoms: {
    // High impact 
    irregular_periods: { weight: 0.35, commonTriggers: ["hormonal_imbalance", "stress", "weight_changes"] },
    weight_gain: { weight: 0.30, commonTriggers: ["insulin_resistance", "hormonal_changes", "poor_diet"] },
    hair_loss: { weight: 0.25, commonTriggers: ["high_androgens", "hormonal_imbalance"] },
    
    // Medium impact
    fatigue: { weight: 0.20, commonTriggers: ["poor_sleep", "stress", "hormonal_changes"] },
    mood_swings: { weight: 0.18, commonTriggers: ["hormonal_changes", "poor_sleep", "stress"] },
    acne: { weight: 0.15, commonTriggers: ["hormonal_changes", "stress", "poor_diet"] },
    bloating: { weight: 0.12, commonTriggers: ["diet", "hormonal_changes", "digestive_issues"] },
    
    // Lower impact 
    poor_sleep: { weight: 0.10, commonTriggers: ["stress", "hormonal_changes", "lifestyle"] },
    stress: { weight: 0.08, commonTriggers: ["work", "relationships", "health_concerns"] },
    cramps: { weight: 0.07, commonTriggers: ["period", "hormonal_changes"] },
    period: { weight: 0.05, commonTriggers: ["natural_cycle"] },
    
    // Positive indicators
    good_sleep: { weight: -0.05, commonTriggers: ["good_routine", "relaxation"] },
    energy: { weight: -0.08, commonTriggers: ["good_sleep", "exercise", "nutrition"] },
    positive_mood: { weight: -0.10, commonTriggers: ["good_sleep", "exercise", "social_support"] },
    recovery: { weight: -0.05, commonTriggers: ["rest", "self_care"] },
    relief: { weight: -0.03, commonTriggers: ["symptom_management"] }
  },
  
  correlations: [
 
    { symptom1: "poor_sleep", symptom2: "fatigue", strength: 0.92 },
    { symptom1: "stress", symptom2: "poor_sleep", strength: 0.88 },
    { symptom1: "stress", symptom2: "mood_swings", strength: 0.85 },
    { symptom1: "hormonal_changes", symptom2: "acne", strength: 0.82 },
    
    { symptom1: "weight_gain", symptom2: "bloating", strength: 0.75 },
    { symptom1: "poor_diet", symptom2: "bloating", strength: 0.73 },
    { symptom1: "stress", symptom2: "acne", strength: 0.70 },
    { symptom1: "fatigue", symptom2: "mood_swings", strength: 0.68 },
    { symptom1: "period", symptom2: "cramps", strength: 0.65 },
    
    { symptom1: "good_sleep", symptom2: "fatigue", strength: -0.85 },
    { symptom1: "exercise", symptom2: "mood_swings", strength: -0.70 },
    { symptom1: "good_sleep", symptom2: "stress", strength: -0.65 }
  ],
  
  // Risk factors and their weights
  riskFactors: {
    high_frequency_symptoms: {
      threshold: 15, 
      weight: 0.3,
      message: "High symptom frequency detected"
    },
    severe_symptoms: {
      threshold: 7, 
      weight: 0.25,
      message: "Severe symptoms reported"
    },
    sleep_disruption: {
      threshold: 5, 
      weight: 0.2,
      message: "Chronic sleep issues"
    },
    hormonal_symptoms: {
      symptoms: ["irregular_periods", "acne", "hair_loss", "weight_gain"],
      weight: 0.15,
      message: "Multiple hormonal symptoms"
    },
    cycle_irregularity: {
      threshold: 5, 
      weight: 0.1,
      message: "Irregular menstrual cycles"
    }
  },
  
 
  recommendations: {
    poor_sleep_fatigue: [
      "Establish consistent sleep schedule (same bedtime/wake time)",
      "Create calming bedtime routine (no screens 1 hour before)",
      "Keep bedroom cool, dark, and quiet",
      "Consider magnesium supplement (consult doctor first)"
    ],
    stress_mood: [
      "Practice daily stress management (meditation, deep breathing)",
      "Regular exercise - even 15 minutes helps",
      "Talk to someone - friend, family, or counselor",
      "Consider stress management apps or techniques"
    ],
    weight_bloating: [
      "Focus on anti-inflammatory foods (fish, leafy greens)",
      "Reduce processed foods and added sugars",
      "Stay hydrated - aim for 8 glasses water daily",
      "Consider food diary to identify triggers"
    ],
    hormonal_symptoms: [
      "Consult healthcare provider for hormone evaluation",
      "Track symptoms consistently for medical discussions",
      "Consider PCOS-specific nutrition plan",
      "Regular exercise can help hormone balance"
    ]
  }
};

// Write files
const dataDir = path.join(__dirname);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
fs.writeFileSync(path.join(dataDir, 'symptoms.json'), JSON.stringify(symptoms, null, 2));
fs.writeFileSync(path.join(dataDir, 'pcos-knowledge.json'), JSON.stringify(pcosData, null, 2));

console.log('sample data created successfully!');
