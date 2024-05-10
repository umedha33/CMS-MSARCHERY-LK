const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { addOrder, addContent, addProof, addExpense, addCustNote, addSale, getAllContent, getAllProof, getAllOrders, getAllCustNoes } = require('../controllers/mysubController');

const router = express.Router();

router.post('/addOrder', protect, upload.fields([
    { name: 'customerPic', maxCount: 1 },
    { name: 'customerLicense', maxCount: 1 }
]), addOrder);
router.post('/addContent', protect, upload.array('contentAttachments'), addContent);
router.post('/addProof', protect, upload.array('proofAttachments'), addProof);
router.post('/addExpense', protect, addExpense);
router.post('/addCustNote', protect, upload.array('custNoteFiles'), addCustNote);
router.post('/addSale', protect, addSale);

router.get('/fetchOrder', protect, getAllOrders);
router.get('/fetchContent', protect, getAllContent);
router.get('/fetchProof', protect, getAllProof);
router.get('/fetchCustNote', protect, getAllCustNoes);

module.exports = router;
