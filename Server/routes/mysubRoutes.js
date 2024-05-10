const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addOrder, addContent } = require('../controllers/mysubController');

const router = express.Router();

router.post('/addOrder', protect, upload.fields([
    { name: 'customerPic', maxCount: 1 },
    { name: 'customerLicense', maxCount: 1 }
]), addOrder);
router.post('/addContent', protect, upload.array('contentAttachments'), addContent);


module.exports = router;
