const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (Make sure these are in .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ displayOrder: 1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "portfolio_projects" },
            (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url, public_id: result.public_id });
            }
        );
        stream.end(buffer);
    });
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    try {
        const { title, description, techStack, liveLink, repoLink, featured, featuredOnHome, displayOrder } = req.body;

        let uploadedImages = [];

        // Handle File Uploads (if any)
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            uploadedImages = await Promise.all(uploadPromises);
        }

        // Parse techStack if it came as a string from FormData
        let parsedTechStack = techStack;
        if (typeof techStack === 'string') {
            parsedTechStack = techStack.split(',').map(t => t.trim()).filter(t => t);
        }

        let parsedFeatures = [];
        if (req.body.features && typeof req.body.features === 'string') {
            parsedFeatures = req.body.features.split(',').map(f => f.trim()).filter(f => f);
        }

        const project = new Project({
            title,
            description,
            techStack: parsedTechStack,
            features: parsedFeatures,
            images: uploadedImages, // Array of {url, public_id}
            liveLink,
            repoLink,
            featured: featured === 'true' || featured === true,
            featuredOnHome: featuredOnHome === 'true' || featuredOnHome === true,
            displayOrder: Number(displayOrder) || 0
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        console.error("Create Project Error Details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    try {
        const { title, description, techStack, liveLink, repoLink, featured, featuredOnHome, displayOrder } = req.body;
        const project = await Project.findById(req.params.id);

        if (project) {
            project.title = title || project.title;
            project.description = description || project.description;
            project.liveLink = liveLink || project.liveLink;
            project.repoLink = repoLink || project.repoLink;

            if (featured !== undefined) {
                project.featured = featured === 'true' || featured === true;
            }

            if (featuredOnHome !== undefined) {
                project.featuredOnHome = featuredOnHome === 'true' || featuredOnHome === true;
            }

            if (displayOrder !== undefined) {
                project.displayOrder = Number(displayOrder);
            }

            if (techStack) {
                if (typeof techStack === 'string') {
                    project.techStack = techStack.split(',').map(t => t.trim()).filter(t => t);
                } else {
                    project.techStack = techStack;
                }
            }

            if (req.body.features) {
                if (typeof req.body.features === 'string') {
                    project.features = req.body.features.split(',').map(f => f.trim()).filter(f => f);
                } else {
                    project.features = req.body.features;
                }
            }

            // Handle Image Updates
            let currentImages = project.images;

            // 1. Remove deleted images
            if (req.body.imagesToDelete) {
                try {
                    const imagesToDelete = JSON.parse(req.body.imagesToDelete); // Array of _id strings
                    if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
                        // Optional: Find public_ids to delete from Cloudinary
                        // const toDelete = currentImages.filter(img => imagesToDelete.includes(img._id.toString()));
                        // toDelete.forEach(img => { if(img.public_id) cloudinary.uploader.destroy(img.public_id); });

                        currentImages = currentImages.filter(img => !imagesToDelete.includes(img._id.toString()));
                    }
                } catch (e) {
                    console.error("Error parsing imagesToDelete", e);
                }
            }

            // 2. Reorder remaining images
            if (req.body.existingImagesOrder) {
                try {
                    const order = JSON.parse(req.body.existingImagesOrder); // Array of _id strings
                    if (Array.isArray(order)) {
                        currentImages.sort((a, b) => {
                            const idA = a._id ? a._id.toString() : '';
                            const idB = b._id ? b._id.toString() : '';
                            return order.indexOf(idA) - order.indexOf(idB);
                        });
                    }
                } catch (e) {
                    console.error("Error parsing existingImagesOrder", e);
                }
            }

            // 3. Add New Images
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
                const newImages = await Promise.all(uploadPromises);

                // Append new images to the end
                currentImages = [...currentImages, ...newImages];
            }

            project.images = currentImages;

            // Check if user cleared images (complex with FormData). Ideally we need a "imagesToDelete" field.
            // Skipping complex delete logic for now.

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error("Update Project Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Optional: Delete images from Cloudinary here
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};
