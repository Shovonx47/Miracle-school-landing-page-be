const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Get all news with optional category filter
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        
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
