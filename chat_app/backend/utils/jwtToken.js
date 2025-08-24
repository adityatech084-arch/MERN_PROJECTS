import jwt from 'jsonwebtoken';

export const generatejwtToken =(user,message,statusCode,res)=>{
    const token= jwt.sign({id:user._id} ,process.env.JWT_SCRET_KEY,{expiresIn:process.env.JWT_EXPIRE} )
      return res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        sameSite:"none",
        secure:process.env.NODE_ENV !=="development" ? true : false,
       
      }).json({
        sucess:true,
        message,
        token
      })
}
