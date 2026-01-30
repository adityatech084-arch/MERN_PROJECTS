import User from "../models/User.js";
import {generateToken} from "../utils/jwt.js"
import bcrypt from "bcryptjs";
export const login = async(req, res) => {
  try {
    let {email, password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        sucess:false,
        message: "All fields are required"});
    }
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        sucess:false,
        message: "Invalid credentials"});
    }   
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({
        sucess:false,
        message: "Invalid credentials"});
    }

    generateToken(user, res);
   
    return res.status(200).json({
      sucess:true,
      message: "Login successful",
      user,
    }); 
  } catch (error) {
    return res.status(500).json({
      sucess:false,
      message: "Server Error"});    
  }
};
export const register = async(req, res) => {                 
  try {
    let {fullName, email, password  } = req.body;
    if(!email || !password || !fullName){
      return res.status(400).json({
        sucess:false,
        message: "All fields are required"});
    }

   let existuser =await User.findOne({email});
   if(existuser){
    return res.json({
      sucess:false,
      message: "User already exists"});
    };
    const hashed = await bcrypt.hash(password, 10);
    
    let user = await User.create({
      fullName,
      email,
      password:hashed,
    });
     

    generateToken(user, res);

    return res.status(201).json({
      sucess:true,
      message: "User registered successfully",
      user,
    });



  } catch (error) {
     return res.status(500).json({
      sucess:false,
      message: "Server Error"});
  }     

};


export const logout = (req, res) => {
    try {
     return res.cookie("token", "", {
        httpOnly: true,
        secure:true,
        sameSite:"strict",
        expires: new Date(0),   
        }).status(200).json({
        sucess:true,
        message: "Logout successful"});
         
    } catch (error) {
      return res.status(500).json({
        sucess:false,
        message: "Server Error"});    
    }
       
        
};




export const getUser = async (req, res) => {             
    
     let u = req.user;
     let user = await User.findById(u._id).select("-password");
     if(!user){
      return res.status(404).json({         
        sucess:false,
        message: "User not found"});
     }
     return res.status(200).json({        
       sucess:true,
     user,
     });
    // Get user logic here    

    // res.send("Get User endpoint");  
};
export const updateUser = (req, res) => {
    // Update user logic here   
    res.send("Update User endpoint");
};
export const deleteUser = (req, res) => {   
    // Delete user logic here
    res.send("Delete User endpoint");
};
export const changePassword = (req, res) => {   
    // Change password logic here   
    res.send("Change Password endpoint");
};
export const resetPassword = (req, res) => {    

    // Reset password logic here
    res.send("Reset Password endpoint");
};