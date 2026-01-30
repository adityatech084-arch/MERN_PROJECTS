import Message from "../models/Message.js";
import User from "../models/User.js";
import { io } from "../utils/socket.js";
import { uploadToCloudinary } from "../config/cloudinary.js";




export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // 1️⃣ Save message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text,
    });

    // 2️⃣ Update sender chat
    await User.updateOne(
      { _id: senderId, "chats.user": receiverId },
      {
        $set: {
          "chats.$.lastMessage": text,
          "chats.$.lastMessageAt": message.createdAt,
        },
      }
    );

    await User.updateOne(
      { _id: senderId, "chats.user": { $ne: receiverId } },
      {
        $push: {
          chats: {
            user: receiverId,
            lastMessage: text,
            lastMessageAt: message.createdAt,
            unreadCount: 0,
          },
        },
      }
    );

    // 3️⃣ Update receiver chat
    await User.updateOne(
      { _id: receiverId, "chats.user": senderId },
      {
        $set: {
          "chats.$.lastMessage": text,
          "chats.$.lastMessageAt": message.createdAt,
        },
        $inc: { "chats.$.unreadCount": 1 },
      }
    );

    await User.updateOne(
      { _id: receiverId, "chats.user": { $ne: senderId } },
      {
        $push: {
          chats: {
            user: senderId,
            lastMessage: text,
            lastMessageAt: message.createdAt,
            unreadCount: 1,
          },
        },
      }
    );
        io.to(receiverId).emit("receive-message", message);

    return res.status(201).json({
      success: true,
      message: "Message sent",
      data: message,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};














export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;
        await User.updateOne(
      { _id: myId, "chats.user": userId },
      {
        $set: { "chats.$.unreadCount": 0 }
      }
    );

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 }).populate("sender", "fullName profilePic");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getMyChats = async (req, res) => {
  try {
    const myId = req.user._id;

    const user = await User.findById(myId)
      .select("chats")
      .populate("chats.user", "fullName email profilePic online lastSeen")
      .lean();

    const chats = user.chats
      .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
      .map(chat => ({
        user: chat.user,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        unreadCount: chat.unreadCount,
        online: chat.user.online,
        lastSeen: chat.user.lastSeen,
      }));

    res.status(200).json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
