const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

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
