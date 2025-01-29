const AcademicCalendar = require('../models/academicCalendar');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all academic calendar data
exports.getAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    try {
        const academicCalendars = await AcademicCalendar.find();

        if (!academicCalendars || academicCalendars.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No calendar entries found'
            });
        }

        res.status(200).json({
            success: true,
            count: academicCalendars.length,
            data: academicCalendars
        });
    } catch (error) {
        return next(new ErrorHandler('Error fetching academic calendar data', 500));
    }
});

// Create new academic calendar entry
exports.createAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    try {
        const academicCalendar = await AcademicCalendar.create(req.body);

        res.status(201).json({
            success: true,
            data: academicCalendar
        });
    } catch (error) {
        return next(new ErrorHandler('Error creating academic calendar entry', 500));
    }
});

// Update academic calendar entry
exports.updateAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    try {
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
    } catch (error) {
        return next(new ErrorHandler('Error updating academic calendar entry', 500));
    }
});

// Delete academic calendar entry
exports.deleteAcademicCalendar = catchAsyncErrors(async (req, res, next) => {
    try {
        const academicCalendar = await AcademicCalendar.findById(req.params.id);

        if (!academicCalendar) {
            return next(new ErrorHandler('Academic calendar entry not found', 404));
        }

        await academicCalendar.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Academic calendar entry deleted successfully'
        });
    } catch (error) {
        return next(new ErrorHandler('Error deleting academic calendar entry', 500));
    }
});
