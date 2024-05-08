const express = require('express');
const { registerUser, authUser, allUsers, fetchAllEmp, updateUserStatus } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers)
router.get('/fetchAllEmp', protect, fetchAllEmp)
router.post('/login', authUser)
router.put('/updateStatus', protect, updateUserStatus);


module.exports = router;