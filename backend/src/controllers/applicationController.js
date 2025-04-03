// Application controller
const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply for job
exports.applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied' });
    }

    const newApplication = new Application({
      job: req.params.jobId,
      applicant: req.user.userId,
      resume: req.file.path // From multer upload
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get applications for a job
exports.getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};