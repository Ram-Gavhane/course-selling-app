const express = require("express");
const Router = express.Router;
const bcrypt = require("bcrypt");

const userRouter = Router();
userRouter.use(express.json());

const { userModel } = require("../db")

userRouter.post("/signup", async function(req, res){
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email
    })
    console.log(user)
    if(user){
        res.json({
            message: "User exists with this email, Try with another email"
        });
    }else{
        const hashedPass = await bcrypt.hash(password, 5);
        await userModel.create({
            username,
            firstName,
            lastName,
            email,
            password: hashedPass
        })

        res.json({
            message: "Account created successfully"
        });
    }
});

userRouter.post("/login", async function(req, res){

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