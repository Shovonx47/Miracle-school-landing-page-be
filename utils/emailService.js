const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendFeedbackEmail = async (feedback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'shovonislam493@gmail.com',
    subject: `New Feedback: ${feedback.type}`,
    html: `
      <h2>New Feedback Received</h2>
      <p><strong>Type:</strong> ${feedback.type}</p>
      <p><strong>From:</strong> ${feedback.name}</p>
      <p><strong>Email:</strong> ${feedback.email}</p>
      <p><strong>Phone:</strong> ${feedback.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${feedback.message}</p>
      ${feedback.attachments.length ? `
        <p><strong>Attachments:</strong></p>
        <ul>
          ${feedback.attachments.map(url => `<li><a href="${url}">View Attachment</a></li>`).join('')}
        </ul>
      ` : ''}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = { sendFeedbackEmail }; 