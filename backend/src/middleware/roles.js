exports.checkEmployer = (req, res, next) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ 
      error: 'Employer privileges required for this action'
    });
  }
  next();
};

exports.checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Admin privileges required for this action'
    });
  }
  next();
};