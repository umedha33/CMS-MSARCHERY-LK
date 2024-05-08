const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const cloudinary = require('../config/cloudinary');

const addTask = asyncHandler(async (req, res) => {
    const { taskTitle, taskDescription, taskRecipient, taskDueDate, taskStatus, taskAddComments, taskRefLinks } = req.body;

    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error('User not authenticated');
    }

    const task = await Task.findOne({}).sort({ taskId: -1 });
    const nextTaskId = task ? task.taskId + 1 : 1;

    // Handle file uploads
    const taskAttachments = [];
    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => {
            return cloudinary.uploader.upload(file.path, { resource_type: "auto" });
        });

        const uploadResults = await Promise.all(uploadPromises);
        uploadResults.forEach(result => {
            taskAttachments.push({ fileName: result.original_filename, fileUrl: result.secure_url });
        });
    }

    const newTask = new Task({
        taskId: nextTaskId,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskRecipient: taskRecipient,
        taskaskAssigner: req.user._id,
        taskDueDate: taskDueDate,
        taskStatus: taskStatus,
        taskAddComments: taskAddComments,
        taskRefLinks: taskRefLinks,
        taskAttachments: taskAttachments,
    });

    const createdTask = await newTask.save();

    res.status(201).json({
        message: 'Task created successfully',
        task: createdTask,
    });
})

module.exports = { addTask };
