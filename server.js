const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// routes
const userRoutes = require('./routes/users');
const symptomRoutes = require("./routes/symptoms");
const intelligenceRoutes = require('./routes/intelligence');


const app = express();
const PORT  = 3000;

// middlewares 
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use((err,req,res,next)=>{
    console.error("Error",err.stack);
    res.status(500).json({
        success:false,
        message : "Some error occurred",
        
    })
})

// routes
app.use('/api/users',userRoutes);
app.use('/api/symptoms',symptomRoutes);
app.use('/api/intelligence',intelligenceRoutes);

// Welcome message
app.get('/',(req,res)=>{
    res.json({
        message : "PCOS Health Tracker API",
        version : "1.0.0",
        endpoints :[
            "POST /api/users/register - Register new user",
            "POST /api/symptoms/log - Log daily symptoms",
            "GET /api/intelligence/insights/:userId - Get smart insights",
            "GET /api/intelligence/risk-score/:userId - Get risk score",
            "GET /api/intelligence/predict-period/:userId - Predict next period"
        ]
    })
})

app.listen(PORT,()=>{
    console.log(`PCOS Tracker API running on http://localhost:${PORT}`);
})
