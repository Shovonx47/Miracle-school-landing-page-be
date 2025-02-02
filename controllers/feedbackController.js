const Feedback = require('../models/Feedback');
const { sendFeedbackEmail } = require('../utils/emailService');

exports.submitFeedback = async (req, res) => {
  try {
    // Create feedback in database
    const feedback = await Feedback.create(req.body);

    // Send email notification
    const emailSent = await sendFeedbackEmail(feedback);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      emailSent,
      feedback
    });
  } catch (error) {
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
    res.status(500).json({
      success: false,
      message: 'Error fetching feedbacks',
      error: error.message
    });
  }
}; 