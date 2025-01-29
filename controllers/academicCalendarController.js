const AcademicCalendar = require('../models/academicCalendar');

// Get all academic calendar data
exports.getAcademicCalendar = async (req, res) => {
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
        console.error('Error fetching academic calendar:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching academic calendar data',
            error: error.message
        });
    }
};

// Create new academic calendar entry
exports.createAcademicCalendar = async (req, res) => {
    try {
        const academicCalendar = await AcademicCalendar.create(req.body);

        res.status(201).json({
            success: true,
            data: academicCalendar
        });
    } catch (error) {
        console.error('Error creating academic calendar:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating academic calendar entry',
            error: error.message
        });
    }
};

// Update academic calendar entry
exports.updateAcademicCalendar = async (req, res) => {
    try {
        let academicCalendar = await AcademicCalendar.findById(req.params.id);

        if (!academicCalendar) {
            return res.status(404).json({
                success: false,
                message: 'Academic calendar entry not found'
            });
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
        console.error('Error updating academic calendar:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating academic calendar entry',
            error: error.message
        });
    }
};

// Delete academic calendar entry
exports.deleteAcademicCalendar = async (req, res) => {
    try {
        const academicCalendar = await AcademicCalendar.findById(req.params.id);

        if (!academicCalendar) {
            return res.status(404).json({
                success: false,
                message: 'Academic calendar entry not found'
            });
        }

        await academicCalendar.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Academic calendar entry deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting academic calendar:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting academic calendar entry',
            error: error.message
        });
    }
};
