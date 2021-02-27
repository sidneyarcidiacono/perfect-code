const CodeSubmission = require('../models/codeSub');
const User = require('../models/user');

const { getSessionToken } = require('../utils/deepCodeRequests');
const { submitBundle } = require('../utils/deepCodeRequests');

exports.newCodeSubmission = (req, res, next) => {
  const newSubmission = new CodeSubmission(req.body);
  let submission;
  newSubmission.save()
    .then((savedSubmission) => {
      // TODO: Find user by logged in user
      submission = savedSubmission;
      return User.findById(req.userId);
    })
    .then((user) => {
      console.log(`Submission: ${submission}`);
      user.codeSubs.push(submission._id);
      return user.save();
    })
    .then((result) => getSessionToken())
    .then((sessionToken) => submitBundle(submission, sessionToken))
    .then((result) => {
      console.log(`Result of submit bundle: ${result}`);
      res.status(200).json({ submission });
    })
    .catch((err) => {
      throw err.message;
    });
};

exports.getAnalysis = (req, res, next) => {
  console.log('In controller');
  return res.status(200).json({ msg: 'This is a placeholder message.' });
};
