const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: [String],
    images: [{
        url: String,
        public_id: String
    }],
    liveLink: {
        type: String
    },
    repoLink: {
        type: String,
        required: true
    },
    demoVideo: {
        type: String
    },
    features: [String],
    featured: {
        type: Boolean,
        default: false
    },
    featuredOnHome: {
        type: Boolean,
        default: false
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
