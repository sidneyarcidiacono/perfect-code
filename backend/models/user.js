const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salt = process.env.SECRET_KEY;

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
    maxlength: 100,
  },
  codeSubs: [{ type: Schema.Types.ObjectId, ref: 'CodeSubmission' }],
});

// Need to use function to enable this.password to work.
User.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', User);
