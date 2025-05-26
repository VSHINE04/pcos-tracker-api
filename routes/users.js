const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const getUsers = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/users.json'), 
    JSON.stringify(users, null, 2)
  );
};


router.post('/register', (req, res) => {
  try {
    const { name, age, weight, height, avgCycleLength } = req.body;
    
    if (!name || !age || !weight) {
      return res.status(400).json({
        success: false,
        message: "Name, age, and weight are required"
      });
    }
    
    const users = getUsers();
    
    const newUser = {
      id: `user${Date.now()}`, 
      name,
      age,
      weight,
      height: height || 160,
      avgCycleLength: avgCycleLength || 28,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    saveUsers(users);
    
    res.json({
      success: true,
      message: "User registered successfully!",
      user: newUser
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message
    });
  }
});


router.get('/profile/:userId', (req, res) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.id === req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.json({
      success: true,
      user: user
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile"
    });
  }
});

module.exports = router;