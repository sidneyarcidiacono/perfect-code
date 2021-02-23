const mongoose = require('mongoose');

const { Schema } = mongoose;

const CodeSubmission = new Schema({
  // repo is repository name
  repo: {
    type: String,
    required: true,
  },
  // oid is either a commit hash or branch name
  oid: {
    type: String,
    required: false,
  },
  // owner is the github username of the user
  owner: {
    type: String,
    required: true,
  },
  // This is our internal backreference to our user
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamp: true });

module.exports = mongoose.model('CodeSubmission', CodeSubmission);
