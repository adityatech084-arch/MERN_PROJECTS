import User from "../models/User.js";
export const blockUser = async (req, res) => {
  const userId = req.user._id;
  const { targetUserId } = req.body;

  await User.findByIdAndUpdate(userId, {
    $addToSet: { blockedUsers: targetUserId },
  });

  await User.findByIdAndUpdate(targetUserId, {
    $addToSet: { blockedUsers: userId },
  });

  res.json({ success: true });
};


export const unblockUser = async (req, res) => {
  const userId = req.user._id;
  const { targetUserId } = req.body;

  // Remove target from blockedUsers
  await User.findByIdAndUpdate(userId, {
    $pull: { blockedUsers: targetUserId },
  });

  // OPTIONAL: Remove this user from target's blockedUsers
  await User.findByIdAndUpdate(targetUserId, {
    $pull: { blockedUsers: userId },
  });

  res.json({ success: true, message: "User unblocked successfully" });
};
