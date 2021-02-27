const express = require('express');

const router = express.Router();

const submissionController = require('../controllers/submission');
const isAuth = require('../middleware/is-auth');

// Restrict access to routes using is-auth middleware
router.post('/new', isAuth, submissionController.newCodeSubmission);

module.exports = router;
