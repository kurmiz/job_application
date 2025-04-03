const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { checkEmployer } = require('../middleware/roles');
const upload = require('../config/multer');
const {
  applyForJob,
  getJobApplications
} = require('../controllers/applicationController');

// Apply for job
router.post(
  '/:jobId/apply',
  auth,
  upload.single('resume'),
  applyForJob
);

// Get job applications
router.get(
  '/:jobId/applications',
  auth,
  checkEmployer,
  getJobApplications
);

module.exports = router;