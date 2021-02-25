const CodeSubmission = require('../models/codeSub');

exports.newCodeSubmission = (req, res, next) => {
  const newSubmission = new CodeSubmission(req.body);
  newSubmission.save()
    .then((submission) => {
      // TODO: Find user by logged in user
      // and add new code submission id to their list of subs
      console.log(`Submission: ${submission}`);
      res.status(200).json({ submission });
    })
    .catch((err) => {
      throw err.message;
    });
};
