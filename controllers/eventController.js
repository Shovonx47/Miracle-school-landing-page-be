const Event = require('../models/event');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new event => /api/v1/admin/event/new
exports.newEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.create(req.body);
    res.status(201).json({
        success: true,
        event
    });
});

// Get all events => /api/v1/events
exports.getEvents = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 6;
    const eventsCount = await Event.countDocuments();

    const apiFeatures = new APIFeatures(Event.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const events = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: events.length,
        eventsCount,
        events
    });
});

// Get single event details => /api/v1/event/:slug
exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findOne({ slug: req.params.slug });

    if (!event) {
        return next(new ErrorHandler('Event not found', 404));
    }

    res.status(200).json({
        success: true,
        event
    });
});

// Update event => /api/v1/admin/event/:id
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorHandler('Event not found', 404));
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        event
    });
});

// Delete event => /api/v1/admin/event/:id
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorHandler('Event not found', 404));
    }

    await event.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Event deleted successfully'
    });
});
