const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${options.senderName}" <${process.env.EMAIL_USER}>`, // Outlook requires 'from' to match auth user usually
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: options.senderEmail,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
