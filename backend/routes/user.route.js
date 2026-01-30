import express from "express";
const router = express.Router();
import {changePassword, deleteUser, getUser,login,logout,register, resetPassword, updateUser,} from "../controllers/authControler.js"
import {authMiddleware} from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
router.get("/me",authMiddleware, getUser)
router.post("/login", login)
router.post("/register", register)
router.post("/logout",authMiddleware, logout)
router.put("/update",authMiddleware, updateUser)
router.delete("/delete",authMiddleware, deleteUser)
router.put("/change-password",authMiddleware, changePassword)
router.put("/reset-password",authMiddleware, resetPassword);
router.get("/search", authMiddleware, async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username query is required" });
  }

  try {
    // Case-insensitive search, partial match
    const users = await User.find({
      fullName: { $regex: username, $options: "i" },
      _id: { $ne: req.user._id }, // exclude current logged-in user
    }).select("-password -chats") // return only necessary fields

    return res.json(users);
  } catch (err) {
    console.error("User search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});





export default router;