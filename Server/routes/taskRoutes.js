const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTask } = require('../controllers/taskControllers');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/addtask', protect, upload.array('taskAttachments'), addTask);

module.exports = router;
