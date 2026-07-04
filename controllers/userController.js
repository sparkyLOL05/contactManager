const User=require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")


//@desc Register a user
//@route post /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User Already Registered!")
    }
    //creating hashpassword
    const hashedPassword=await bcrypt.hash(password,10)
    console.log("hashed password:",hashedPassword)
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })

    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({id:user.id,email:user.email})
    }
    else{
        res.status(400)
        throw new Error("User data invalid")
    }

})
//@desc login a user
//@route post /api/users/register
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const user=await User.findOne({email})
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("Email or password not valid")
    }
    
})
//@desc Current user information
//@route get /api/users/current
//@access private
const getUsers=asyncHandler(async(req,res)=>{
    res.json(req.user)
    
})
module.exports={registerUser,loginUser,getUsers}