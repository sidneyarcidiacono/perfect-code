const User = require('../models/user');

exports.signUpUser = (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then((user) => res.status(200).json({
      msg: 'Sign up successful!',
      user: {
        username: user.username,
        email: user.email,
        codeSubs: user.codeSubs,
      },
    }))
    .catch((err) => {
      throw new Error('Unable to create user.');
    });
};

exports.getUser = (req, res, next) => {
  // TODO: populate user's codeSubmissions
  User.findById(req.params.id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => {
      throw new Error('User not found.');
    });
};
