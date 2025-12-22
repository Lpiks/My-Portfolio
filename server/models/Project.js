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
    techStack: [{
        type: String
    }],
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
    features: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
