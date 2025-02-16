const express = require("express");
const Router = express.Router;

const adminRouter = Router();

const { adminModel } = require("../db");

adminRouter.post("/signup", function(req, res){
    
});

adminRouter.post("/login", function(req, res){

});

adminRouter.post("/createCourse", function(req, res){

});

adminRouter.post("/deleteCourse", function(req, res){

});

adminRouter.post("/addCourseContent", function(req, res){

});

adminRouter.get("/createdCourses", function(req, res){

});

module.exports = {
    adminRouter
}