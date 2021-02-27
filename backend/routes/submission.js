const express = require('express');

const router = express.Router();

const submissionController = require('../controllers/submission');
const isAuth = require('../middleware/isAuth');

// Restrict access to routes using is-auth middleware
router.post('/new', isAuth, submissionController.newCodeSubmission);

// Restrict access to routes using is-auth middleware
router.get('/analysis', submissionController.getAnalysis);

module.exports = router;
