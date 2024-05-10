const express = require('express');
const { registerUser, authUser, allUsers, fetchAllEmp, updateUserStatus, addEmpLog, getEmpLogs } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers)
router.get('/fetchAllEmp', protect, fetchAllEmp)
router.post('/login', authUser)
router.put('/updateStatus', protect, updateUserStatus);
router.post('/emplogs', protect, addEmpLog)
router.get('/fetchEmplogs', protect, getEmpLogs)


module.exports = router;