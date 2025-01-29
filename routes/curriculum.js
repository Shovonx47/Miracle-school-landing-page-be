const express = require('express');
const router = express.Router();

const {
    getAllCurriculum,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum
} = require('../controllers/curriculumController');

router.route('/curriculum').get(getAllCurriculum);
router.route('/curriculum/new').post(createCurriculum);
router.route('/curriculum/:id')
    .put(updateCurriculum)
    .delete(deleteCurriculum);

module.exports = router;
