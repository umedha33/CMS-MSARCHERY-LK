const mongoose = require("mongoose");

const emplogModel = mongoose.Schema({
    logId: { type: Number, require: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },

}, {
    timestamps: true,
});

const empLog = mongoose.model('EmpLogs', emplogModel);

module.exports = empLog;