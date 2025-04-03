const express = require('express');
const router = express.Router();
const {
  getJobsToModerate,
  approveJob,
  getAllUsers,
  deleteUser
} = require('../controllers/adminController');
const { auth, checkAdmin } = require('../middleware/auth');

// Job Moderation
router.get('/jobs/pending', auth, checkAdmin, getJobsToModerate);
router.put('/jobs/approve/:jobId', auth, checkAdmin, approveJob);

// User Management
router.get('/users', auth, checkAdmin, getAllUsers);
router.delete('/users/:userId', auth, checkAdmin, deleteUser);

module.exports = router;