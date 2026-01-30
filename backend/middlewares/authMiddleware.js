import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Check if token exists in cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided"
      });
    }

    // 2. Verify token (Ensuring JWT_SECRET matches your generateToken file)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user and attach to the request (Excluding password)
    // We use await here to avoid the "Circular Structure" error
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 4. Attach the user object to the request for use in controllers
    req.user = user;
    
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again."
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed."
    });
  }
};

