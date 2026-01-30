import express from 'express';
import Group from '../models/Group.js';
import User from '../models/User.js';
import GroupMessage from '../models/GroupMessage.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


// router.post("/create", async (req, res) => {
//   try {
//     const { name, members, adminId } = req.body;

//     if (!name || !adminId) {
//       return res.status(400).json({ message: "Name and adminId required" });
//     }

//     // YOU are included here 👇
//     const allMembers = [...new Set([adminId, ...(members || [])])];

//     const group = await Group.create({
//       name,
//       creator: adminId,
//       admins: [adminId],
//       members: allMembers,
//     });

//     // Group added to YOU + all members
//     await User.updateMany(
//       { _id: { $in: allMembers } },
//       { $addToSet: { groups: group._id } }
//     );

//     res.status(201).json({
//       message: "Group created successfully",
//       group,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


router.post("/create", async (req, res) => {
  try {
    const { name, members, adminId } = req.body;

    if (!name || !adminId) {
      return res.status(400).json({ message: "Name and adminId required" });
    }

    // Include admin in members
    const allMembers = [...new Set([adminId, ...(members || [])])];

    // Create the group
    const group = await Group.create({
      name,
      creator: adminId,
      admins: [adminId],
      members: allMembers,
    });

    // Add group to all users' groups array with lastMessage and unreadCount
    await User.updateMany(
      { _id: { $in: allMembers } },
      {
        $push: {
          groups: {
            groupId: group._id,
            lastMessage: "",
            unreadCount: 0,
            lastMessageAt: new Date(),
          },
        },
      }
    );

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/my", authMiddleware , async (req, res) => {
  try {
    const  userId  = req.user._id;
    // console.log(req.user)

    // Find groups where user is actually in members array
    const groups = await Group.find({ members: userId })
      .select("_id name creator admins members lastMessage") // select only needed fields
      .populate("lastMessage", "text senderId createdAt")   // optional: lastMessage preview
      .lean();

    // Map to include role and format for frontend
    // const result = groups.map((group) => {
    //   let role = "member";

    //   if (group.creator.toString() === userId) {
    //     role = "creator";
    //   } else if (Array.isArray(group.admins) && group.admins.some(id => id.toString() === userId)) {
    //     role = "admin";
    //   }

    // //   return {
    // //     id: group._id,
    // //     name: group.name,
    // //     role,
    // //     creator: group.creator,
    // //     admins: group.admins,
    // //     members: group.members,
    // //     lastMessage: group.lastMessage || null,
    // //     unreadCount: 0, // you can calculate real unreadCount here if needed
    // //   };
    // // });


  
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.post("/send-message", async (req, res) => {
  try {
    const { groupId, senderId, text } = req.body;

    if (!groupId || !senderId || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Check if group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // 2️⃣ Check if sender is a member
    if (!group.members.includes(senderId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // 3️⃣ Save message
    const message = await GroupMessage.create({
      group: groupId,
      sender: senderId,
      text,
      type: "text",
    });

    // 4️⃣ Update group's lastMessage
    group.lastMessage = {
      text: message.text,
      messageId: message._id,
    };
    await group.save();

    // 5️⃣ Update each member's User.groups
    // Sender: do not increase unread
    await User.updateMany(
      {
        "groups.groupId": groupId,
        _id: { $ne: senderId }, // exclude sender
      },
      {
        $set: { "groups.$.lastMessage": text, "groups.$.lastMessageAt": new Date() },
        $inc: { "groups.$.unreadCount": 1 },
      }
    );

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});



router.get("/messages/:groupId",authMiddleware, async (req, res) => {
  try {
    const { groupId } = req.params;

    // ✅ SAFELY resolve userId
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1️⃣ Check group exists
    const group = await Group.findById(groupId).select("members");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // 2️⃣ SAFELY check membership
    const isMember = Array.isArray(group.members) &&
      group.members.some(memberId =>
        memberId && memberId.toString() === userId.toString()
      );

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    // 3️⃣ Fetch messages
    const messages = await GroupMessage.find({ group: groupId })
      .populate("sender", "_id fullName profilePic")
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json(messages);
  } catch (error) {
    console.error("GET GROUP MESSAGES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.get('/user/groups',authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id)
      .populate("groups.groupId", "name members") // populate group name + members
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Flatten groups
    const groups = user.groups.map((g) => ({
      _id: g.groupId._id,        // use actual group _id
      name: g.groupId.name,
      members: g.groupId.members,
      lastMessage: g.lastMessage,
      lastMessageAt: g.lastMessageAt,
      unreadCount: g.unreadCount
    }));
      return res.json({ success: true, groups });
  } catch (err) {
    console.error("Get user groups error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
