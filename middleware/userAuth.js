const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET_USER} = require("../config")

async function userAuth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET_USER);
    
    if(decodedData){
        req.id = decodedData.id;
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