const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.signUpUser);

// router.get('/:id', userController.getUser);

module.exports = router;
