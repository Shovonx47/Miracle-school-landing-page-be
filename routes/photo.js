const express = require('express');
const router = express.Router();

const { getPhotos, getSinglePhoto } = require('../controllers/photoController');

router.route('/photos').get(getPhotos);
router.route('/photos/:id').get(getSinglePhoto);

module.exports = router; 