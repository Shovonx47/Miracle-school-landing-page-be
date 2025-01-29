const express = require('express');
const router = express.Router();

const {
    getAcademicCalendar,
    createAcademicCalendar,
    updateAcademicCalendar,
    deleteAcademicCalendar
} = require('../controllers/academicCalendarController');

router.route('/academic-calendar').get(getAcademicCalendar);
router.route('/academic-calendar/new').post(createAcademicCalendar);
router.route('/academic-calendar/:id')
    .put(updateAcademicCalendar)
    .delete(deleteAcademicCalendar);

module.exports = router;
