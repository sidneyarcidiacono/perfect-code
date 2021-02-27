const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signUpUser = (req, res, next) => {
  let user
  bcrypt.hash(req.body.password, 12)
    .then(hashedPassword => {
      user = new User({
        username: req.body.username,
        email: req.body.email
        password: hashedPassword,
      })
      return user.save()
    })
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

exports.signInUser = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        throw new Error('No user found with that username, please try again.');
      }
      user.comparePassword(password, (err, isMatch) => {
        console.log(`Password line 31 user controller: ${password}`);
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: 'Wrong username or password' });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET_KEY, {
          expiresIn: '60 days',
        });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        console.log(`Token line 40 user controller: ${token}`);
        return res.status(201).json({ token });
      });
    })
    .catch((err) => {
      throw err.message;
    });
};

exports.getUser = (req, res, next) => {
  // TODO: populate user's codeSubmissions
  User.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      throw new Error('User not found.');
    });
};
