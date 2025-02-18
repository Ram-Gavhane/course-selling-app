const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_USER} = require("../config")

async function userAuth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET_USER);
    const id = decodedData._id;
    const user = await userModel.findOne({
        id
    })
    
    if(user){
        req.id = id;
        next();
    }else{
        res.status(403).json({
            message : "Invalid Credentials"
        })
    }
}

module.exports = {
    userAuth
}