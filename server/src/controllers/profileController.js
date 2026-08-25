// src/controllers/profileController.js
const Portfolio = require('../models/Portfolio.js');

const getProfile = async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne();        
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne();
        if (!portfolio) {
            portfolio = await Portfolio.create(req.body);
        } else {
            portfolio = await Portfolio.findByIdAndUpdate(portfolio._id, req.body, { new: true });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// MUST export as an object with matching property names
module.exports = {
    getProfile,
    updateProfile
};