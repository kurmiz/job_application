const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  createJob,
  getJobs,
  getJobById,
  deleteJob
} = require('../controllers/jobController');
const { auth, checkEmployer } = require('../middleware/auth');

// @route   GET /api/jobs
router.get('/', getJobs);

// @route   GET /api/jobs/:id
router.get('/:id', getJobById);

// @route   POST /api/jobs
router.post(
  '/',
  [
    auth,
    checkEmployer,
    check('title', 'Title is required').notEmpty().trim(),
    check('company', 'Company is required').notEmpty().trim(),
    check('location', 'Location is required').notEmpty().trim(),
    check('description', 'Description must be at least 50 characters')
      .isLength({ min: 50 })
  ],
  createJob
);

// @route   DELETE /api/jobs/:id
router.delete('/:id', [auth, checkEmployer], deleteJob);

module.exports = router;