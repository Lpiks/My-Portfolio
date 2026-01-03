const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getProjects)
    .post(protect, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'demoVideo', maxCount: 1 }]), createProject);

router.route('/:id')
    .get(getProjectById)
    .put(protect, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'demoVideo', maxCount: 1 }]), updateProject)
    .delete(protect, deleteProject);

module.exports = router;
