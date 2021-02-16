const User = require('../models/user');

exports.signUpUser = (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      throw new Error('Unable to create user.');
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      throw new Error('User not found.');
    });
};
