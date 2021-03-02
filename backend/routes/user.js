const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

// Restrict access to routes using isAuth middleware
router.get('/:id', isAuth, userController.getUser);

// Restrict access to routes using isAuth middleware
router.delete('/:id', isAuth, userController.deleteUserAccount);

// Restrict access to routes using isAuth middleware
router.put('/:id', isAuth, userController.updateUser);

router.post('/signin', userController.signInUser);

router.post('/signup', userController.signUpUser);

module.exports = router;
