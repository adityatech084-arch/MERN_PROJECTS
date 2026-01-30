import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
      required: true,
    },

    text: {
      type: String,
      trim: true,
    },

    attachments: [
      {
        url: String,
        type: String, // image | video | file
      },
    ],

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;