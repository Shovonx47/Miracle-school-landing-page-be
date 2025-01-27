const express = require('express');
const router = express.Router();
const Administration = require('../models/administrationModel');

// Get administration data
router.get('/', async (req, res) => {
    try {
        const administrationData = await Administration.findOne();
        
        if (!administrationData) {
            return res.status(404).json({
                success: false,
                message: 'Administration data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                governingBody: administrationData.governingBody,
                albumImages: administrationData.albumImages,
                contact: administrationData.contact
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
