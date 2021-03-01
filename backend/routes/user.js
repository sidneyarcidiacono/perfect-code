const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

// Restrict access to routes using is-auth middleware
router.get('/:id', isAuth, userController.getUser);

// Restrict access to routes using is-auth middleware
router.delete('/:id', isAuth, userController.deleteUserAccount);

router.post('/signin', userController.signInUser);

router.post('/signup', userController.signUpUser);

module.exports = router;
