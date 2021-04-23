const express = require('express');
const MenuController = require('../controllers/menu.controller');
const md_auth=require('../middleware/authenticated');

const api=express.Router();
api.post("/add-menu",[md_auth.ensureAuth], MenuController.addMenu);
api.get("/get-menu", MenuController.getMenu);
api.put("/update-menu/:id",[md_auth.ensureAuth], MenuController.updateMenu);

module.exports=api;