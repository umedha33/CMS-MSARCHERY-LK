const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/addOrder', protect, upload.array('taskAttachments'), addOrder);

module.exports = router;
