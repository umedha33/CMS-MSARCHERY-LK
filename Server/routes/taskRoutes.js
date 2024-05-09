const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTask, fetchTasks, fetchAsnTasks, updateTskStatus } = require('../controllers/taskControllers');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/addtask', protect, upload.array('taskAttachments'), addTask);
router.get('/fetchtasks', protect, fetchTasks);
router.get('/fetchasntasks', protect, fetchAsnTasks);
router.put('/updatetskstatus', protect, updateTskStatus);

module.exports = router;
