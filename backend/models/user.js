const mongoose = require('mongoose');

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
  },
  codeSubs: [{ type: Schema.Types.ObjectId, ref: 'CodeSubmission' }],
});

module.exports = mongoose.model('User', User);
