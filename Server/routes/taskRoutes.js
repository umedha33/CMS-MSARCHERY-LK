const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTask, fetchTasks, fetchAsnTasks } = require('../controllers/taskControllers');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/addtask', protect, upload.array('taskAttachments'), addTask);
router.get('/fetchtasks', protect, fetchTasks);
router.get('/fetchasntasks', protect, fetchAsnTasks);

module.exports = router;
