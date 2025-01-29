const CollegeStats = require('../models/CollegeStats');

// Get all college stats
exports.getCollegeStats = async (req, res) => {
    try {
        const stats = await CollegeStats.find().sort('createdAt');
        
        if (!stats || stats.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'College stats not found'
            });
        }

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
