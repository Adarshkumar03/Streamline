const Project = require('../models/Project');
const User = require('../models/User');

// Create a project
const createProject = async (req, res) => {
    try {
        const { name, description, ownerId } = req.body;
        const project = new Project({ name, description, owner: ownerId });
        await project.save();

        // Add project to the user's projects list
        const user = await User.findById(ownerId);
        user.projects.push(project);
        await user.save();

        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all projects for a user
const getProjectsByUser = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.params.userId }).populate('owner').populate('members');
        res.status(200).json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single project
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('owner').populate('members');
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a project
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createProject, deleteProject, updateProject, getProjectById, getProjectsByUser
}