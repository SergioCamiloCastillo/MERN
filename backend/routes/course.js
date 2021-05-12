const express = require("express");
const CourseController = require("../controllers/course.controller");
const md_auth = require('../middleware/authenticated');
const api = express.Router();
api.post("/add-course", CourseController.addCourse);
module.exports = api;