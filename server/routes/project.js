const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/projectControllers');

// Create a project
router.post('/', projectControllers.createProject);

// Get all projects for a user
router.get('/user/:userId', projectControllers.getProjectsByUser);

// Get a single project
router.get('/:id', projectControllers.getProjectById);

// Update a project
router.put('/:id', projectControllers.updateProject);

// Delete a project
router.delete('/:id', projectControllers.deleteProject);

module.exports = router;