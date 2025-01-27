const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');
const Administration = require('../models/administrationModel');

// Combined route for administration page
router.get('/administration', async (req, res) => {
    try {
        const administrationData = await Administration.findOne();
        
        if (!administrationData) {
            // If no data exists, return default data
            return res.status(200).json({
                success: true,
                data: {
                    governingBody: [],
                    albumImages: [],
                    contact: {
                        name: "Birshreshtha Noor Mohammad Public College",
                        address: "Peelkhana, Dhaka 1205, Bangladesh",
                        phone: "+88-02-58613870 (Direct)",
                        email: "info@noormohammadcollege.ac.bd"
                    }
                }
            });
        }

        res.status(200).json({
            success: true,
            data: {
                governingBody: administrationData.governingBody || [],
                albumImages: administrationData.albumImages || [],
                contact: administrationData.contact || {
                    name: "Birshreshtha Noor Mohammad Public College",
                    address: "Peelkhana, Dhaka 1205, Bangladesh",
                    phone: "+88-02-58613870 (Direct)",
                    email: "info@noormohammadcollege.ac.bd"
                }
            }
        });
    } catch (error) {
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
