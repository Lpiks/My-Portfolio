const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log(`📧 Attempting to send email to: ${process.env.EMAIL_USER}`);
    const transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 5000, // 5 seconds to connect
        socketTimeout: 5000 // 5 seconds to send data
    });

    const mailOptions = {
        from: `"${options.senderName}" <${process.env.EMAIL_USER}>`, // Outlook requires 'from' to match auth user usually
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: options.senderEmail,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email Sent Successfully via SMTP!");
};

module.exports = sendEmail;
