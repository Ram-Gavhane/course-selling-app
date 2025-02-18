const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_ADMIN} = require("../config")

async function adminAuth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET_ADMIN);
    const id = decodedData._id;
    const admin = await adminModel.findOne({
        id
    })
    
    if(admin){
        req.id = id;
        next();
    }else{
        res.status(403).json({
            message : "Invalid Credentials"
        })
    }
}

module.exports = {
    adminAuth
}