const express = require('express');
const authController = require('../controllers/auth.controller');
const MenuController = require('../controllers/menu.controller');
const md_auth=require('../middleware/authenticated');

const api=express.Router();
api.post("/add-menu",[md_auth.ensureAuth], MenuController.addMenu);

module.exports=api;