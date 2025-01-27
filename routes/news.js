const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Get all news with optional category filter
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        
        if (category) {
            // If category is specified, filter by that category
            query.category = category;
        } else {
            // If no category is specified, exclude notices
            query.category = { $ne: 'Notice' };
        }
        
        const news = await News.find(query);
        res.status(200).json({
            success: true,
            count: news.length,
            news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single news by ID
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findOne({ id: req.params.id });
        
        if (!news) {
            return res.status(404).json({
                success: false,
                error: 'News not found'
            });
        }

        res.status(200).json({
            success: true,
            news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
