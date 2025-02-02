const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // This should be an App Password
  },
  tls: {
    rejectUnauthorized: false // For development
  }
});

// Verify transporter
transporter.verify(function(error, success) {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email server is ready");
  }
});

const sendFeedbackEmail = async (feedback) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shovonislam493@gmail.com',
      subject: `New Feedback Received: ${feedback.type}`,
      html: `
        <h2>New Feedback Received</h2>
        ${feedback.name !== 'Anonymous' ? `<p><strong>Name:</strong> ${feedback.name}</p>` : ''}
        ${feedback.email !== 'Not provided' ? `<p><strong>Email:</strong> ${feedback.email}</p>` : ''}
        ${feedback.phone !== 'Not provided' ? `<p><strong>Phone:</strong> ${feedback.phone}</p>` : ''}
        ${feedback.message !== 'No message provided' ? `
          <p><strong>Message:</strong></p>
          <p>${feedback.message}</p>
        ` : ''}
        ${feedback.attachments && feedback.attachments.length ? `
          <p><strong>Attachments:</strong></p>
          <ul>
            ${feedback.attachments.map(url => `<li><a href="${url}">View Attachment</a></li>`).join('')}
          </ul>
        ` : ''}
        <p><strong>Type:</strong> ${feedback.type}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = { sendFeedbackEmail }; 