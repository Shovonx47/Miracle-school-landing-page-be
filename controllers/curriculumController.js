const Curriculum = require('../models/curriculum');

// Get all curriculum data
exports.getAllCurriculum = async (req, res) => {
    try {
        const curriculum = await Curriculum.find();

        if (!curriculum || curriculum.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: 'No curriculum entries found'
            });
        }

        res.status(200).json({
            success: true,
            count: curriculum.length,
            data: curriculum
        });
    } catch (error) {
        console.error('Error fetching curriculum:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching curriculum data',
            error: error.message
        });
    }
};

// Create new curriculum entry
exports.createCurriculum = async (req, res) => {
    try {
        const curriculum = await Curriculum.create(req.body);

        res.status(201).json({
            success: true,
            data: curriculum
        });
    } catch (error) {
        console.error('Error creating curriculum:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating curriculum entry',
            error: error.message
        });
    }
};

// Update curriculum entry
exports.updateCurriculum = async (req, res) => {
    try {
        let curriculum = await Curriculum.findById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({
                success: false,
                message: 'Curriculum entry not found'
            });
        }

        curriculum = await Curriculum.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: curriculum
        });
    } catch (error) {
        console.error('Error updating curriculum:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating curriculum entry',
            error: error.message
        });
    }
};

// Delete curriculum entry
exports.deleteCurriculum = async (req, res) => {
    try {
        const curriculum = await Curriculum.findById(req.params.id);

        if (!curriculum) {
            return res.status(404).json({
                success: false,
                message: 'Curriculum entry not found'
            });
        }

        await curriculum.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Curriculum entry deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting curriculum:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting curriculum entry',
            error: error.message
        });
    }
};
