const express = require("express");
const Router = express.Router;

const jwt = require("jsonwebtoken");
const {JWT_SECRET_ADMIN} = require("../config")

const {adminAuth} = require("../middleware/adminAuth")
const adminRouter = Router();

const bcrypt = require("bcrypt");

const { adminModel,courseModel } = require("../db");

adminRouter.post("/signup", async function(req, res){
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = await adminModel.findOne({
        email: email
    })
    console.log(user)
    if(user){
        res.json({
            message: "Admin exists with this email, Try with another email"
        });
    }else{
        const hashedPass = await bcrypt.hash(password, 5);
        await adminModel.create({
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

adminRouter.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        username
    })
    const passCheck = await bcrypt.compare(password, admin.password);

    if(admin){
        if(passCheck){
            const token = jwt.sign({
                id: admin._id
            },JWT_SECRET_ADMIN);

            res.json({
                message: "You are logged in successfully",
                token: token
            })
        }else{
            res.json({
                message: "Your password is incorrect",
                token: token
            })
        }
    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
});

adminRouter.post("/createCourse", adminAuth, async function(req, res){
    const id = req.id;
    const { title, description, price, imageurl } = req.body;

    const  course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageurl: imageurl,
        creatorId: id
    })

    res.json({
        message: "Course created Successfully",
        courseId: course._id
    })
});

adminRouter.post("/deleteCourse", adminAuth, async function(req, res){
    const creatorId = req.id;
    const courseId = req.body.courseId;

    const course = await courseModel.findOne({
        _id: courseId,
        creatorId
    })
    console.log(course)
    console.log(creatorId)
    if(course){
        await courseModel.deleteOne({
            _id: courseId,
            creatorId
        })
        res.json({
            message: "Course deleted"
        })
    }else{
        res.json({
            message: "Course Cannot be deleted"
        })
    }
});

// adminRouter.post("/addCourseContent", function(req, res){

// });

adminRouter.get("/createdCourses", adminAuth, async function(req, res){
    const creatorId = req.id;

    const courses = await courseModel.find({
        creatorId
    })

    res.json({
        courses
    })
});

module.exports = {
    adminRouter
}