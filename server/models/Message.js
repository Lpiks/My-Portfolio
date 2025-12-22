const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'General Inquiry'
    },
    relatedProject: {
        type: String,
        default: 'General'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
