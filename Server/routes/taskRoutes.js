const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addTask, fetchTasks, fetchAsnTasks, updateTskStatus, updateTask, deleteTask } = require('../controllers/taskControllers');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/addtask', protect, upload.array('taskAttachments'), addTask);
router.get('/fetchtasks', protect, fetchTasks);
router.get('/fetchasntasks', protect, fetchAsnTasks);
router.put('/updatetskstatus', protect, updateTskStatus);
router.put('/updatetask', protect, updateTask);
router.delete('/deletetask', protect, deleteTask);


module.exports = router;
