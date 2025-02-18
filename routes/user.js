const express = require("express");
const Router = express.Router;

const jwt = require("jsonwebtoken");
const {JWT_SECRET_USER} = require("../config")

const bcrypt = require("bcrypt");

const userRouter = Router();
userRouter.use(express.json());

const {userAuth} = require("../middleware/userAuth")

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
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
        username
    })
    
    
    if(user){
        const passCheck = await bcrypt.compare(password, user.password);
        if(passCheck){
            const token = jwt.sign({
                id: user._id
            },JWT_SECRET_USER);
            res.json({
                message: "You are logged in successfully",
                token: token
            })
        }else{
            res.json({
                message: "Your password is incorrect",
                
            })
        }
    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
});

userRouter.get("/allCourses", function(req, res){

});

userRouter.post("/buyCourse", userAuth, function(req, res){
    res.json({
        message: "Reached"
    })
});

userRouter.get("/purchasedCourses", function(req, res){

});

module.exports = {
    userRouter
}