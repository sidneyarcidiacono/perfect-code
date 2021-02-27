const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

// Restrict access to routes using is-auth middleware
router.get('/:id', isAuth, userController.getUser);

router.post('/signin', userController.signInUser);

router.post('/signup', userController.signUpUser);

module.exports = router;
