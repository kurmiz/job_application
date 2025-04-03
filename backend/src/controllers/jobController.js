const Job = require('../models/Job');
const Application = require('../models/Application');
const { validationResult } = require('express-validator');

// @desc    Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const { search, location, minSalary } = req.query;
    const filters = {};

    if (search) filters.title = { $regex: search, $options: 'i' };
    if (location) filters.location = { $regex: location, $options: 'i' };
    if (minSalary) filters.salary = { $gte: minSalary };

    const jobs = await Job.find(filters)
      .populate('employer', 'name email')
      .sort('-createdAt');
      
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name email company');
      
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create job
exports.createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newJob = new Job({
      ...req.body,
      employer: req.user.userId
    });

    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Check ownership
    if (job.employer.toString() !== req.user.userId) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await job.deleteOne();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};