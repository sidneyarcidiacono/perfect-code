const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/:id', userController.getUser);

router.post('/signup', userController.signUpUser);

module.exports = router;
