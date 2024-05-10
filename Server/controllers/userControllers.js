const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const EmpLog = require('../models/emplogModel')
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role, pic } = req.body

    if (!name || !email || !phone || !password || !role) {
        res.status(400);
        throw new Error('Enter all feilds!')
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Exists!')
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            // password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error('Failed to create the User');
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            // password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {};
    const users = await User.find(keyword)
        .find({ _id: { $ne: req.user._id } });
    res.send(users);
})

const fetchAllEmp = asyncHandler(async (req, res) => {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
});

const updateUserStatus = asyncHandler(async (req, res) => {
    const { userStatus } = req.body;
    // console.log(userStatus, req.user);

    if (!req.user) {
        res.status(401);
        throw new Error('User not authenticated.');
    }

    if (typeof userStatus !== 'boolean') {
        res.status(400);
        throw new Error("Invalid status. Must be a boolean value (true for 'online', false for 'offline').");
    }

    if (!req.user) {
        res.status(404);
        throw new Error('User not found.');
    }

    req.user.userActive = userStatus;
    await req.user.save();

    res.status(200).json({
        message: `User status updated successfully to ${userStatus ? 'online' : 'offline'}.`,
        user: req.user,
        // userActive: req.user.userActive,
    });
});

const addEmpLog = asyncHandler(async (req, res) => {
    const { startTime, endTime } = req.body;

    if (!startTime || !endTime) {
        res.status(400);
        throw new Error('start time and end time missing');
    }

    if (!req.user || !req.user._id) {
        res.status(401);
        throw new Error('User not authenticated');
    }

    const lastLog = await EmpLog.findOne({}).sort({ logId: -1 });
    const nextLogId = lastLog ? lastLog.logId + 1 : 1;

    const newLog = new EmpLog({
        logId: nextLogId,
        userId: req.user._id,
        startTime: startTime,
        endTime: endTime,
    });

    const createdLog = await newLog.save();

    res.status(201).json({
        message: 'Employee log created successfully',
        log: createdLog,
    });
});

const getEmpLogs = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401).send('User not authenticated');
        return;
    }

    const logs = await EmpLog.find({})
        .populate('userId', 'name')
        .sort({ logId: -1 });

    res.status(200).json({
        message: 'Employee logs fetched successfully',
        logs: logs,
    });
});



module.exports = { registerUser, authUser, allUsers, fetchAllEmp, updateUserStatus, addEmpLog, getEmpLogs };

