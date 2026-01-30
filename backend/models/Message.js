import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    text: { type: String },
    media: [{ url: String, type: String }],
    deliveredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    messageType: { type: String, enum: ["text", "image", "video", "file"], default: "text" },
  },
  { timestamps: true }
);

const Message  =  mongoose.model("messages", messageSchema);
export default Message;
