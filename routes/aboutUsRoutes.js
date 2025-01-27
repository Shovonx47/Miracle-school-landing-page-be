const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');
const Administration = require('../models/administrationModel');

// Combined route for administration page
router.get('/administration', async (req, res) => {
    try {
        let administrationData = await Administration.findOne();
        
        // If no data exists, create default data
        if (!administrationData) {
            const defaultData = require('../data/administrationSeeder');
            administrationData = await Administration.create(defaultData);
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
        console.error('Administration route error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Governing Body routes
router.post('/governing-body', aboutUsController.createGoverningBodyMember);
router.get('/governing-body', aboutUsController.getGoverningBodyMembers);
router.put('/governing-body/:id', aboutUsController.updateGoverningBodyMember);
router.delete('/governing-body/:id', aboutUsController.deleteGoverningBodyMember);

// Album Images routes
router.post('/album-images', aboutUsController.createAlbumImage);
router.get('/album-images', aboutUsController.getAlbumImages);
router.delete('/album-images/:id', aboutUsController.deleteAlbumImage);

module.exports = router;
