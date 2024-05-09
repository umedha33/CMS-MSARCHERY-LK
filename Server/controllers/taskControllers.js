const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');

const addTask = asyncHandler(async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskRecipient, taskDueDate, taskStatus, taskAddComments, taskRefLinks } = req.body;
        let taskAttachments = [];

        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const task = await Task.findOne({}).sort({ taskId: -1 });
        const nextTaskId = task ? task.taskId + 1 : 1;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
            });

            const uploadResults = await Promise.all(uploadPromises);
            taskAttachments = uploadResults.map(result => ({
                fileName: result.original_filename,
                fileUrl: result.secure_url,
            }));
        }

        const newTask = new Task({
            taskId: nextTaskId,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskRecipient: taskRecipient,
            taskAssigner: req.user._id,
            taskDueDate: taskDueDate,
            taskStatus: taskStatus,
            taskAddComments: taskAddComments,
            taskRefLinks: taskRefLinks,
            taskAttachments: taskAttachments,
        });

        let createdTask = await newTask.save();
        createdTask = await createdTask.populate('taskAssigner', 'name email');

        res.status(201).json({
            message: 'Task created successfully',
            task: createdTask,
        });
    } catch (error) {
        console.error('Error occurred while creating the task', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const fetchTasks = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user.role) {
            res.status(401);
            throw new Error('User not authenticated or missing role information');
        }

        const tasks = await Task.find({ taskRecipient: req.user.role })
            .populate('taskAssigner', 'name email')
            .sort({ taskDueDate: 1 });

        res.status(201).json({ tasks });
    } catch (error) {
        console.error('Error occurred while fetching tasks', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const fetchAsnTasks = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error('User not authenticated');
        }

        const asnTasks = await Task.find({ taskAssigner: req.user._id })
            .populate('taskAssigner', 'name email')
            .sort({ taskDueDate: 1 });

        res.status(201).json({ asnTasks });
    } catch (error) {
        console.error('Error occurred while fetching asntasks', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

const updateTskStatus = asyncHandler(async (req, res) => {
    const { taskId, status } = req.body;
    // console.log(req.body);

    if (!req.user) {
        res.status(401);
        throw new Error('User not authenticated.');
    }

    if (!taskId || !status) {
        res.status(400);
        throw new Error('taskId and status missing');
    }

    try {
        const task = await Task.findOne({ taskId });

        if (!task) {
            res.status(404);
            throw new Error('Task not found.');
        }

        task.taskStatus = status;
        await task.save();
        // console.log(`task updated`);

        res.status(201).json({
            message: `Task status updated successfully to ${status}.`,
        });

    } catch (error) {
        res.status(500);
        // console.log('Error updating task status: ' + error.message);
        throw new Error('Error updating task status: ' + error.message);
    }
});


module.exports = { addTask, fetchTasks, fetchAsnTasks, updateTskStatus };