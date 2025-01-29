const AcademicCalendar = require('../models/academicCalendar');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all academic calendar data
exports.getAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    const academicCalendars = await AcademicCalendar.find();

    res.status(200).json({
        success: true,
        data: academicCalendars
    });
});

// Create new academic calendar entry
exports.createAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    const academicCalendar = await AcademicCalendar.create(req.body);

    res.status(201).json({
        success: true,
        data: academicCalendar
    });
});

// Update academic calendar entry
exports.updateAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    let academicCalendar = await AcademicCalendar.findById(req.params.id);

    if (!academicCalendar) {
        return next(new ErrorHandler('Academic calendar entry not found', 404));
    }

    academicCalendar = await AcademicCalendar.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: academicCalendar
    });
});

// Delete academic calendar entry
exports.deleteAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    const academicCalendar = await AcademicCalendar.findById(req.params.id);

    if (!academicCalendar) {
        return next(new ErrorHandler('Academic calendar entry not found', 404));
    }

    await academicCalendar.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Academic calendar entry deleted successfully'
    });
});
