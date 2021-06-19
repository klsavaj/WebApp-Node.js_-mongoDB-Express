require("dotenv").config(); 
const jwt = require("jsonwebtoken");
const signupm = require("../models/signupm");

const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,"YouHaveToWriteSecretKeyHereHavingMinimum32Characters");
        // console.log(verifyUser);

        const user = await signupm.findOne({_id:verifyUser._id})
        // console.log(user);

        req.token=token;
        req.user = user;

        next();
    }catch(error){
        res.status(401).send(error);
    }
}

module.exports = auth;
