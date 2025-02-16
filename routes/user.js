const express = require("express");
const Router = express.Router;

const userRouter = Router();

userRouter.post("/signup", function(req, res){
    
});

userRouter.post("/login", function(req, res){

});

userRouter.get("/allCourses", function(req, res){

});

userRouter.post("/buyCourse", function(req, res){

});

userRouter.get("/purchasedCourses", function(req, res){

});

module.exports = {
    userRouter
}