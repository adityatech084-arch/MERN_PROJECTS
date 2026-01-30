import express from "express";
import { sendMessage, getMessages, getMyChats } from "../controllers/messageControler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";
import User from "../models/User.js";
import Group from "../models/Group.js";

const router = express.Router();
router.post("/send-message",  authMiddleware,upload.array("media", 5), sendMessage);
router.get("/previous-chats",authMiddleware,getMyChats);
router.get("/:userId", authMiddleware, getMessages);
router.put("/mark-read/:chatUserId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Now req.user exists
    const chatUserId = req.params.chatUserId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const chat = user.chats.find((c) => c.user.toString() === chatUserId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.unreadCount = 0;
    chat.messages.forEach((msg) => (msg.seen = true));

    await user.save();
      //    const io = req.app.get("io");
      // io.to(userId.toString()).emit("unread-cleared", { chatUserId });
    res.status(200).json({ message: "Chat marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
