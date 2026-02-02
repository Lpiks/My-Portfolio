const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { senderName, senderEmail, message, relatedProject, subject } = req.body;

        const newMessage = await Message.create({
            senderName,
            senderEmail,
            message,
            subject: subject || 'General Inquiry',
            relatedProject: relatedProject || 'General'
        });

        // HTML Email Template
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #1a1a1a; color: #fff; border-radius: 10px;">
                <h2 style="color: #10b981; border-bottom: 1px solid #333; padding-bottom: 10px;">New Portfolio Inquiry</h2>
                
                <p><strong>From:</strong> ${senderName} (${senderEmail})</p>
                <p><strong>Context:</strong> <span style="background-color: #333; padding: 2px 6px; border-radius: 4px; color: #10b981;">${relatedProject || 'General'}</span></p>
                
                <div style="background-color: #222; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                    <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #333; padding-top: 10px;">
                    Sent via Portfolio Contact Form
                </div>
            </div>
        `;

        // Send Email (Await to ensure delivery on serverless platforms)
        try {
            await sendEmail({
                senderName,
                senderEmail, // Passed for reply-to
                subject: `[New Lead] - ${relatedProject || 'General Inquiry'}`,
                html: emailHtml
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // We still return success to the user as the message was saved to DB
        }

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (message) {
            message.isRead = true;
            await message.save();
            res.json(message);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    markAsRead,
    deleteMessage
};
