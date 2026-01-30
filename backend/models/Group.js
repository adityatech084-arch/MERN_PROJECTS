import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    groupImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    // Fixed lastMessage
    lastMessage: {
      text: { type: String, default: "" }, // last message text
      messageId: { type: mongoose.Schema.Types.ObjectId, ref: "GroupMessage" }, // ref to GroupMessage
    },
 unreadCount: { type: Number, default: 0 },
    isGroup: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Groups", groupSchema);

export default Group;
