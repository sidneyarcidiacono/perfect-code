const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signUpUser = (req, res, next) => {
  let user;
  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      const token = jwt.sign({
        email: user.email,
        userId: user._id.toString(),
      }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      res.status(200).json({
        msg: 'Sign up successful!',
        user: {
          username: user.username,
          email: user.email,
          codeSubs: user.codeSubs,
        },
        token,
      });
    })
    .catch((err) => {
      throw new Error('Unable to create user.');
    });
};

exports.signInUser = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  let loadedUser;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        throw new Error('No user found with that username, please try again.');
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Incorrect password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    })
    .catch((err) => {
      throw err.message;
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.userId).lean().populate('codeSubs')
    .then((user) => res.status(200).json({ user }))
    .catch((err) => {
      throw new Error('User not found.');
    });
};

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.userId }, req.body, { new: true })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => {
      throw err.message;
    });
};

exports.deleteUserAccount = (req, res, next) => {
  User.findOneAndDelete({ _id: req.userId }, (err, deletedUser) => {
    if (err) {
      throw err.message;
    } else {
      return res.status(204).json({ msg: 'User successfully deleted' });
    }
  });
};
