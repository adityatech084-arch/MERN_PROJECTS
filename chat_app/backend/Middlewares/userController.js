import UserModel from "../Models/UserModel.js";
import { generatejwtToken } from "../utils/jwtToken.js";
import catchAsyncError from "./catchAsyncError.middleware.js"
import bcrypt from 'bcryptjs'
import { io } from "../utils/socket.js";
// import UserModel from "../Models/UserModel.js";
import { v2 as cloudinary} from "cloudinary"
export const signup = catchAsyncError(async (req,res,next)=>{
    let {fullName , email ,password} = req.body;
    
    if(!fullName || !email || !password){
        return res.status(400).json({
            sucess:false,
            message:'please provide full details!'
        })
    }

    const emailRegex= /^\S+@\S+\.\S+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({
            sucess:false,
            message:"Invalid email format!"
        })
    }

    if(password.length < 8 ){
        return res.status(400).json({
            sucess:false,
            message:"Password must be at least 8char long!"
        })
    }



   const isEmailAleradyUsed=await UserModel.findOne({email});

   if(isEmailAleradyUsed){
    return res.status(400).json({
        sucess:false,
        message:"email is Alerady in use try diff one"
    })
   }

   const hashPassword= await bcrypt.hash(password,10);


   const user = await UserModel.create({
    fullName,
    email,
    password:hashPassword,
     avatar:{
        public_id:"",
        url:""
    }
   });
     
  io.emit('new-user-added');


   generatejwtToken(user , "user registered sucesfully",201,res);

})
export const signin = catchAsyncError(async (req,res,next)=>{
let {email,password ,...rest} =req.body;
if (Object.keys(rest).length > 0) {
    return res.status(400).json({ error: "Extra fields are not allowed" });
  }
  if(!email || !password){
    return res.status(400).json({
        sucess:false,
        message:"please provide full details email and password!"
    })
  }

  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(404).json({
        sucess:false,
        message:"no user exist singup first"
    })
  }

  const passMatch = await bcrypt.compare(password,user.password);
  if(!passMatch){
    return res.status(400).json({
        sucess:false,
        message:"passwor is incrrocet"
    })
  }

  generatejwtToken(user,"user login in sucessfully", 200 ,res);

})
export const signout = catchAsyncError(async (req,res)=>{

        res.status(200).cookie("token","",{
        httpOnly:true,
        maxAge:0,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development" ? true : false,
       
      }).json({
        sucess:true,
        message:"user logged out sucesufully!",
      })
})
export const getUser = catchAsyncError(async (req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        sucess:true,
        user
    })

})


export const updateProfile = catchAsyncError(async (req, res, next) => {
     

  const { fullName, email } = req?.body;

  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (email) updates.email = email;

  const avatar = req?.files?.avatar;
  if (avatar) {
    try {
      const oldAvatarPublicId = req?.user?.avatar?.public_id;
      if (oldAvatarPublicId) {
        await cloudinary.uploader.destroy(oldAvatarPublicId);
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
          folder: "ZapChat__users_avatar",
          transformation: [
            { width: 300, height: 300, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );

      updates.avatar = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar",
        error: error.message,
      });
    }
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Nothing to update. Please provide fullName, email, or avatar.",
    });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});


