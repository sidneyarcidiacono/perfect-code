const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

// Restrict access to routes using isAuth middleware
router.delete('/delete', isAuth, userController.deleteUserAccount);

// Restrict access to routes using isAuth middleware
router.put('/update', isAuth, userController.updateUser);

// Restrict access to routes using isAuth middleware
router.get('/', isAuth, userController.getUser);

router.post('/signin', userController.signInUser);

router.post('/signup', userController.signUpUser);

module.exports = router;
