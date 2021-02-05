
const bcrypt = require('bcryptjs');
const User = require('../models/User');
 
const userCtrl = {}
 
userCtrl.signUp = (req, res) => {
    console.log('End Point');
}
 
module.exports = userCtrl;