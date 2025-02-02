const Feedback = require('../models/Feedback');
const { sendFeedbackEmail } = require('../utils/emailService');

exports.submitFeedback = async (req, res) => {
  try {
    console.log('Received feedback:', req.body); // Debug log

    // Validate required fields
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create feedback in database
    const feedback = await Feedback.create({
      name,
      email,
      phone,
      message,
      type: req.body.type || 'General',
      attachments: req.body.attachments || []
    });

    // Send email notification
    const emailSent = await sendFeedbackEmail(feedback);
    console.log('Email sending status:', emailSent); // Debug log

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      emailSent,
      feedback
    });
  } catch (error) {
    console.error('Feedback submission error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedbacks',
      error: error.message
    });
  }
}; 