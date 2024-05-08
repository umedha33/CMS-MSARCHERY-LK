const mongoose = require("mongoose");

const taskModel = mongoose.Schema(
    {
        taskId: { type: Number, require: true },
        taskTitle: { type: String, require: true },
        taskDescription: { type: String },
        taskRecipient: { type: String },
        taskAssigner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        taskAsnDate: {
            type: Date,
            default: Date.now
        },
        taskDueDate: { type: Date },
        taskStatus: { type: String },
        taskAddComments: { type: String },
        taskRefLinks: { type: String },
        taskAttachments: { type: Array },
    }, {
    timestamps: true,
});

const Task = mongoose.model('Tasks', taskModel);

module.exports = Task;