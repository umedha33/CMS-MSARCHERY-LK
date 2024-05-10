const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/addOrder', protect, upload.fields([
    { name: 'customerPic', maxCount: 1 },
    { name: 'customerLicense', maxCount: 1 }
]), addOrder);

module.exports = router;
