const express = require('express');
const { signUp } = require('../controllers/user.controller');
 
const router = express();
 
router.route('/signup')
    .post(signUp);
 
module.exports = router;