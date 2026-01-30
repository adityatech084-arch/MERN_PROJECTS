import Group from "../models/Group.js";
import GroupMessage from "../models/GroupMessage.js";
import User from "../models/User.js";

export default function handleGroupEvents(socket, io) {
  // ========================
  // 1️⃣ Join a group room
  // ========================
  socket.on("join-group", (groupId) => {
    socket.join(groupId);
  });

  // ========================
  // 2️⃣ Leave a group room
  // ========================
  socket.on("leave-group", (groupId) => {
    socket.leave(groupId);
  });

  // ========================
  // 3️⃣ Create a new group
  // ========================
 socket.on("createGroup", async ({ name, memberIds }, callback) => {
  try {
    const creatorId = socket.userId; // get user from socket
    if (!creatorId) return callback({ success: false, message: "Unauthorized" });

    if (!name || !memberIds || !Array.isArray(memberIds)) {
      return callback({ success: false, message: "Invalid data" });
    }

    // Include creator in members
    const allMembers = [...new Set([creatorId, ...memberIds])];

    // 1️⃣ Create group
    const group = await Group.create({
      name,
      creator: creatorId,
      admins: [creatorId],
      members: allMembers,
    });

    // 2️⃣ Update all users' groups array
    await User.updateMany(
      { _id: { $in: allMembers } },
      {
        $push: {
          groups: {
            groupId: group._id,
            lastMessage: "",
            lastMessageAt: new Date(),
            unreadCount: 0, // start with 0 for everyone, you can adjust if needed
          },
        },
      }
    );

    // 3️⃣ Emit live update to all members
    allMembers.forEach((memberId) => {
      io.to(memberId.toString()).emit("newGroup", group);
    });

    // 4️⃣ Callback for creator
    if (callback) callback({ success: true, group });
  } catch (err) {
    console.error("Socket createGroup Error:", err);
    if (callback) callback({ success: false, message: "Server error" });
  }
});


  // ========================
  // 4️⃣ Send group message
  // ========================
  socket.on("send-group-message", async ({ groupId, text, media }) => {
    if (!text && (!media || media.length === 0)) return;

    try {
      // 1️⃣ Save message
      const message = await GroupMessage.create({
        group: groupId,
        sender: socket.userId,
        text,
        media,
      });

      const populatedMsg = await message.populate("sender", "fullName profilePic");

      // 2️⃣ Update unread count + lastMessage for all except sender
      await User.updateMany(
        { "groups.groupId": groupId, _id: { $ne: socket.userId } },
        {
          $set: {
            "groups.$.lastMessage": text,
            "groups.$.lastMessageAt": new Date(),
          },
          $inc: { "groups.$.unreadCount": 1 },
        }
      );

      // 3️⃣ Update group's global lastMessage
      await Group.findByIdAndUpdate(groupId, {
        lastMessage: { text, messageId: message._id },
      });

      // 4️⃣ Emit to all in the room INCLUDING sender
      io.in(groupId.toString()).emit("group-message-received", {
        ...populatedMsg.toObject(),
        groupId,
      });


         const group = await Group.findById(groupId).lean();

    // Emit to all members **for live UI update**
    group.members.forEach(memberId => {
      io.to(memberId.toString()).emit("group-message-update", {
        groupId,
        lastMessage: text,
        lastMessageAt: new Date(),
      });
    });

    // Emit the actual message to all users in group room
 
  
    } catch (err) {
      console.error("SendGroupMessage Error:", err);
    }
  });

  // ========================
  // 5️⃣ Mark group messages as read
  // ========================
  socket.on("mark-group-msg-readed", async ({ groupId }) => {
    try {
      await User.updateOne(
        { _id: socket.userId, "groups.groupId": groupId },
        { $set: { "groups.$.unreadCount": 0 } }
      );

      // Notify frontend
      socket.emit("unread-reset", { groupId });
    } catch (err) {
      console.error("MarkGroupMsgReaded Error:", err);
    }
  });


  socket.on("mark-group-read", async ({ groupId }) => {
  try {
    const userId = socket.userId;

    // 1️⃣ Update unread count in the user's groups array
    await User.updateOne(
      { _id: userId, "groups.groupId": groupId },
      { $set: { "groups.$.unreadCount": 0 } }
    );

    // 2️⃣ Notify this user that unread count is reset
    socket.emit("group-unread-reset", { groupId });

    // Optional: if you want others to know this user read, emit to room
    // socket.to(groupId.toString()).emit("group-read-by-user", { groupId, userId });
  } catch (err) {
    console.error("Socket mark-group-read error:", err);
  }
});

}
