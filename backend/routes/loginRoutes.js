const express = require('express');
const { login } = require('../controllers/loginController.js');

const router = express.Router();

router.get('/login', login);

module.exports = router;