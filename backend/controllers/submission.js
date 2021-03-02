const CodeSubmission = require('../models/codeSub');
const User = require('../models/user');

const { getSessionToken } = require('../utils/deepCodeRequests');
const { submitBundle } = require('../utils/deepCodeRequests');

exports.newCodeSubmission = (req, res, next) => {
  // This creates a new codeSubmission
  // It will also package the files to be sent for analysis when the getAnalysis request is made.
  // Full features coming soon!
  const newSubmission = new CodeSubmission(req.body);
  let submission;
  newSubmission.save()
    .then((savedSubmission) => {
      submission = savedSubmission;
      return User.findById(req.userId);
    })
    .then((user) => {
      user.codeSubs.push(submission._id);
      return user.save();
    })
    // .then((result) => submitBundle(submission))
    .then((response) => {
      res.status(200).json({ submission });
    })
    .catch((err) => {
      throw err.message;
    });
};

exports.getAnalysis = (req, res, next) => {
  // Request analysis from external API (to be written by me at a later date)- coming soon!
  res.status(200).json({ msg: 'Ability to request analysis coming soon!' });
};

exports.viewAnalysis = (req, res, next) => {
  // Populate analysis details from external API (to be written by me at a later date) - coming soon!
  res.status(200).json({ msg: 'Analysis coming soon!' });
};
