const express = require('express');
const router = express.Router();

const auth = require('./api/auth');
const user = require('./api/user');
const mailsender = require('./api/mailsender');
const status = require('./api/status');

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/mailsender', mailsender);
router.use('/status', status);

module.exports = router;
