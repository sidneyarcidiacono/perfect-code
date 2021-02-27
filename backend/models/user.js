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
    required: true,
    maxlength: 100,
  },
  codeSubs: [{ type: Schema.Types.ObjectId, ref: 'CodeSubmission' }],
});

module.exports = mongoose.model('User', User);
