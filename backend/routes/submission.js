const express = require('express');

const router = express.Router();

const submissionController = require('../controllers/submission');
const isAuth = require('../middleware/isAuth');

// Restrict access to routes using isAuth middleware
router.post('/new', isAuth, submissionController.newCodeSubmission);

// Restrict access to routes using isAuth middleware
router.get('/:id', isAuth, submissionController.getAnalysis);

// Restrict access to routes using isAuth middleware
router.get('/:id/analysis', isAuth, submissionController.viewAnalysis);

module.exports = router;
