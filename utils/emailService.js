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
    // Create a more detailed email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6B21A8; border-bottom: 2px solid #6B21A8; padding-bottom: 10px;">নতুন ফিডব্যাক প্রাপ্ত হয়েছে</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4B5563; margin-bottom: 15px;">ফিডব্যাকের ধরন: ${feedback.type}</h3>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4B5563;">প্রেরক তথ্য:</strong>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin: 5px 0;">
                <strong>নাম:</strong> ${feedback.name !== 'Anonymous' ? feedback.name : 'নাম প্রদান করা হয়নি'}
              </li>
              <li style="margin: 5px 0;">
                <strong>ইমেইল:</strong> ${feedback.email !== 'Not provided' ? feedback.email : 'ইমেইল প্রদান করা হয়নি'}
              </li>
              <li style="margin: 5px 0;">
                <strong>ফোন:</strong> ${feedback.phone !== 'Not provided' ? feedback.phone : 'ফোন নম্বর প্রদান করা হয়নি'}
              </li>
            </ul>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4B5563;">ফিডব্যাক বার্তা:</strong>
            <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 5px;">
              ${feedback.message !== 'No message provided' ? feedback.message : 'কোন বার্তা প্রদান করা হয়নি'}
            </p>
          </div>

          ${feedback.attachments && feedback.attachments.length ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #4B5563;">সংযুক্তি:</strong>
              <ul style="list-style: none; padding-left: 0;">
                ${feedback.attachments.map(url => `
                  <li style="margin: 5px 0;">
                    <a href="${url}" style="color: #6B21A8;">সংযুক্তি দেখুন</a>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="margin-top: 20px; font-size: 0.9em; color: #6B7280;">
            <p>প্রাপ্তির সময়: ${new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}</p>
          </div>
        </div>

        <div style="font-size: 0.8em; color: #6B7280; margin-top: 20px; text-align: center;">
          <p>এই ইমেইলটি স্বয়ংক্রিয়ভাবে প্রেরিত হয়েছে। অনুগ্রহ করে এই ইমেইলে উত্তর দেবেন না।</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shovonislam493@gmail.com',
      subject: `নতুন ${feedback.type} প্রাপ্ত হয়েছে - মিরাকল স্কুল`,
      html: emailContent
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