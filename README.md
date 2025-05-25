# 🩺 PCOS Health Tracker API

> A smart backend system for tracking PCOS symptoms with intelligent insights and predictive analytics for women's health management.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

## 🎯 Overview

A comprehensive REST API that helps women with PCOS track symptoms, analyze patterns, and get intelligent health insights. The system provides smart analysis beyond basic data storage - including risk assessment, pattern recognition, and period prediction.

## ✨ Key Features

- **Smart Symptom Analysis** - Detects patterns like sleep-fatigue correlations
- **PCOS Risk Assessment** - Calculates personalized risk scores (0-10 scale)
- **Period Prediction** - Predicts next cycle based on historical data
- **Pattern Recognition** - Identifies symptom triggers and relationships
- **Comprehensive Reports** - Detailed health insights and recommendations

## 🚀 Quick Start

### Installation

```bash
# 1. Clone and setup
git clone <repository-url>
cd pcos-health-tracker
npm install

# 2. Initialize sample data
node data/seed.js

# 3. Start server
node server.js
```

Server runs on `http://localhost:3000`

## 📁 Project Structure

```
pcos-health-tracker/
├── server.js              # Main Express server
├── routes/
│   ├── users.js          # User management endpoints
│   ├── symptoms.js       # Symptom tracking endpoints  
│   └── intelligence.js   # AI analysis endpoints
├── services/
│   └── analyzer.js       # Smart analysis algorithms
├── data/
│   ├── seed.js          # Sample data generator
│   ├── users.json       # User database
│   ├── symptoms.json    # Symptom database
│   └── pcos-knowledge.json # Medical knowledge base
└── README.md
```

## 📱 API Endpoints

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register new user |
| `GET` | `/api/users/profile/:userId` | Get user profile |

### Symptom Tracking  
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/symptoms/log` | Log daily symptoms |
| `GET` | `/api/symptoms/history/:userId` | Get symptom history |
| `GET` | `/api/symptoms/date/:userId/:date` | Get symptoms for date |

### Smart Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/intelligence/insights/:userId` | Get pattern insights |
| `GET` | `/api/intelligence/risk-score/:userId` | Get PCOS risk score |
| `GET` | `/api/intelligence/predict-period/:userId` | Predict next period |
| `GET` | `/api/intelligence/report/:userId` | Comprehensive report |

## 🧪 Testing with Sample Data

The project includes extensive test data for **user1** with 28+ symptom entries spanning 2 months (April-May 2025):

### Pre-loaded Data Includes:
- **Complete menstrual cycles** (April 1-5, May 3-6) 
- **Sleep-fatigue patterns** (poor sleep → extreme fatigue next day)
- **Stress correlations** (work stress → mood swings, acne)
- **PCOS symptoms** (irregular periods, weight gain, hair loss)
- **Recovery periods** (good sleep → high energy days)

### Quick Test Commands:

```bash
# Check server status
curl http://localhost:3000

# Get comprehensive analysis for test user
curl http://localhost:3000/api/intelligence/report/user1

# View symptom history  
curl http://localhost:3000/api/symptoms/history/user1

# Get period prediction
curl http://localhost:3000/api/intelligence/predict-period/user1

# Check risk assessment
curl http://localhost:3000/api/intelligence/risk-score/user1
```

### Expected Demo Results:
- **Pattern Detection**: Sleep-fatigue correlation (85% confidence)
- **Risk Score**: Moderate level (~6.2/10) 
- **Period Prediction**: Next cycle based on 32-day average
- **Top Symptoms**: Fatigue, mood swings, acne

## 🔧 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Priya", "age": 25, "weight": 65, "height": 160}'
```

### Log Symptoms
```bash
curl -X POST http://localhost:3000/api/symptoms/log \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user1",
    "date": "2025-05-25", 
    "symptoms": ["fatigue", "mood_swings"],
    "severity": {"fatigue": 8, "mood_swings": 6},
    "notes": "Poor sleep last night"
  }'
```

## 🧠 Smart Features Implementation

### 1. Pattern Recognition Algorithm
Analyzes symptom co-occurrence and identifies correlations:
```javascript
// Example: Sleep-fatigue correlation detection
const fatigueAfterPoorSleep = symptoms.filter(entry => 
  entry.symptoms.includes('poor_sleep') && 
  nextDay.symptoms.includes('fatigue')
);
```

### 2. Risk Score Calculation
```javascript
Risk Score = Σ(symptom_weight × severity × frequency) / total_entries

// Example weights:
fatigue: 0.2, irregular_periods: 0.3, mood_swings: 0.15
```

### 3. Period Prediction
```javascript
// Calculates average cycle length from historical period data
const avgCycle = periodGaps.reduce((sum, gap) => sum + gap) / periods.length;
const nextPeriod = lastPeriod + avgCycle;
```

## 📊 Sample API Response

```json
{
  "success": true,
  "data": {
    "insights": [
      {
        "type": "correlation",
        "title": "Sleep-Fatigue Connection", 
        "confidence": 0.85,
        "recommendation": "Focus on getting 7-8 hours of quality sleep"
      }
    ],
    "riskScore": {
      "score": 6.2,
      "level": "moderate",
      "message": "Some symptoms to watch. Consider lifestyle adjustments."
    },
    "periodPrediction": {
      "prediction": "2025-06-04",
      "confidence": 0.8,
      "message": "Based on your 32-day average cycle"
    }
  }
}
```

## 🎯 Technical Highlights

- **RESTful API Design** with proper HTTP methods
- **Modular Architecture** for easy maintenance  
- **JSON File Storage** (easily replaceable with database)
- **Smart Algorithms** for health pattern analysis
- **Comprehensive Error Handling** with meaningful messages
- **Medical Knowledge Base** for accurate PCOS insights

## 💡 Real-World Application

This API enables:
- **Self-monitoring** for PCOS patients
- **Pattern identification** for better symptom management
- **Predictive insights** for proactive healthcare
- **Data-driven decisions** for lifestyle improvements
- **Healthcare communication** with detailed reports

## 🔮 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication with JWT
- PDF report generation
- Wearable device integration
- Machine learning for advanced predictions

---

**Built for women's health empowerment through smart technology.**
