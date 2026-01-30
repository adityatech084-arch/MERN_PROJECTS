import mongoose from "mongoose";

const messageStatusSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "messages",
    required: true,
  },
  seen: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const chatUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
  unreadCount: { type: Number, default: 0 },
  messages: [messageStatusSchema],
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/large_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg" },
    online: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    chats: [chatUserSchema],
      groups: [
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
      required: true,
    },
    lastMessage: { type: String, default: "" },
    unreadCount: { type: Number, default: 0 },
    lastMessageAt: { type: Date, default: Date.now },
  }
],
  blockedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
 blockedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const User =  mongoose.model("users", userSchema);
export default User;
