const FAQ = require('../models/faqModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all FAQs => /api/v1/faqs
exports.getFaqs = catchAsyncErrors(async (req, res, next) => {
    const faqs = await FAQ.find();

    res.status(200).json({
        success: true,
        count: faqs.length,
        faqs
    });
});

// Create new FAQ => /api/v1/admin/faq/new
exports.newFaq = catchAsyncErrors(async (req, res, next) => {
    const faq = await FAQ.create(req.body);

    res.status(201).json({
        success: true,
        faq
    });
});

// Get single FAQ => /api/v1/faq/:id
exports.getSingleFaq = catchAsyncErrors(async (req, res, next) => {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
        return next(new ErrorHandler('FAQ not found', 404));
    }

    res.status(200).json({
        success: true,
        faq
    });
});

// Update FAQ => /api/v1/admin/faq/:id
exports.updateFaq = catchAsyncErrors(async (req, res, next) => {
    let faq = await FAQ.findById(req.params.id);

    if (!faq) {
        return next(new ErrorHandler('FAQ not found', 404));
    }

    faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        faq
    });
});

// Delete FAQ => /api/v1/admin/faq/:id
exports.deleteFaq = catchAsyncErrors(async (req, res, next) => {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
        return next(new ErrorHandler('FAQ not found', 404));
    }

    await faq.deleteOne();

    res.status(200).json({
        success: true,
        message: 'FAQ deleted successfully'
    });
});
