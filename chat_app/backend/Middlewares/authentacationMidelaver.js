import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import catchAsyncError from "./catchAsyncError.middleware.js";



// export const authentacationMidelaver = catchAsyncError(async(req,res,next)=>{
    
//     let {token} = req.cookies;
//     if(!token){
//         return res.status(404).json({
//       sucess:false,
//       message:"user is not authentected "
//         })
//     }

//     const decoded = jwt.verify(token , process.env.JWT_SCRET_KEY);
//     if(!decoded){
//         return res.status(404).json({
//             sucess:false,
//             message:"Token verifacation Faild , plz sigin again"
//         })
//     }

//     const user = await UserModel.findById(decoded.id);
//     req.user = user;
//     next();

// })





export const authentacationMidelaver = catchAsyncError(async (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated"
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SCRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again."
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again."
    });
  }

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  req.user = user;
  next();
});

export default authentacationMidelaver;