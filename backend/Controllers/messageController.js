import catchAsyncError from "../Middlewares/catchAsyncError.middleware.js";
import messageModel from "../Models/messageModel.js";
import UserModel from "../Models/UserModel.js";
import fs from 'fs';
import { v2 as cloudinary} from 'cloudinary';
import { getReciverSocketId, io } from "../utils/socket.js";
export const getAllusers = catchAsyncError(async(req,res,next)=>{
   let user= req.user._id;
   const filteruser = await UserModel.find({_id: {$ne : user}}).select("-password")

  //  console.log(filteruser)
   res.status(200).json({
    sucess:true,
    users:filteruser
   })
})

export const getMessages = catchAsyncError(async(req,res,next)=>{
 let reciverId = req.params.id;
 let myId = req.user._id;
 const reciver = await UserModel.findById(reciverId);
 if(!reciver){
    res.status(404).json({
        sucess:false,
        message:"recive is Invalid.."
    })
 }


 const messages = await messageModel.find({
    $or :[
        {senderId:myId,reciverId:reciverId},
        {senderId:reciverId,reciverId:myId}
    ]
 }).sort({createdAt:1})


res.status(200).json({
    sucess:true,
    messages
})
})

// export const sendMessage = catchAsyncError(async(req,res,next)=>{
//   // console.log(req.body)
//   const {text}=req.body;
//     // const text = req?.body?.text || "";
//   const media = req?.files?.media;
//   const {id:reciverId} = req.params;
//   const senderId = req.user._id;
//    const reciver = await UserModel.findById(reciverId);
//  if(!reciver){
//     res.status(404).json({
//         sucess:false,
//         message:"recive is Invalid.."
//     })
//  }


// const sanitizedText = text?.trim() || "";
// if(!sanitizedText && !media){
//    return res.status(400).json({
//     sucess:false,
//     message:"cannot send empty message.."
//    })
// }

// let mediaUrl = "";

// if(media){
//     try{
//     const uploadresponce = await cloudinary.uploader.upload(
//              media.tempFilePath,
//         {
//           folder: "Chat_App_users_avatar",
//           transformation: [
//             { width: 300, height: 300, crop: "limit" },
//             { quality: "auto" },
//             { fetch_format: "auto" },
//           ],
//         }
//     )
//     mediaUrl = uploadresponce?.secure_url;
    
// }catch(error){
//   return res.status(500).json({
//         success: false,
//         message: "Failed to upload media , try diff one...",
//         error: error.message,
//       });
// }
// }


// const newMessage = await messageModel.create({
//   senderId,
//   reciverId,
//   text:sanitizedText,
//   media:mediaUrl
// });

// const reciverSocketId = getReciverSocketId(reciverId);
// if(reciverSocketId){
//   io.to(reciverSocketId).emit("newMessage",newMessage)
// }
// res.status(201).json(newMessage)

// })

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  const media = req?.files?.media;
  const { id: reciverId } = req.params;
  const senderId = req.user._id;

  const reciver = await UserModel.findById(reciverId);
  if (!reciver) {
    return res.status(404).json({
      success: false,
      message: "Receiver is invalid.",
    });
  }

  const sanitizedText = text?.trim() || "";
  if (!sanitizedText && !media) {
    return res.status(400).json({
      success: false,
      message: "Cannot send empty message.",
    });
  }

  let mediaUrl = "";

  if (media) {
    try {
      // 🔍 Determine if it's a video
      const isVideo = media.mimetype.startsWith("video");

      const uploadOptions = {
        folder: "Zap_Chat_media_messageImges",
        resource_type: "auto", // Required for uploading videos
      };

      // Apply transformation only for non-video files (e.g. images)
      if (!isVideo) {
        uploadOptions.transformation = [
          { width: 300, height: 300, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ];
      }

      // ⬆️ Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        media.tempFilePath,
        uploadOptions
      );

      mediaUrl = uploadResponse?.secure_url;

      // 🧹 Clean up temp file
      fs.unlink(media.tempFilePath, (err) => {
        if (err) {
          console.error("Failed to delete temp file:", err);
        } else {
          // console.log("Temp file deleted:", media.tempFilePath);
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload media, try a different one.",
        error: error.message,
      });
    }
  }

  // 📨 Save message
  const newMessage = await messageModel.create({
    senderId,
    reciverId,
    text: sanitizedText,
    media: mediaUrl,
  });

  // 🔔 Notify receiver
  const reciverSocketId = getReciverSocketId(reciverId);
  if (reciverSocketId) {
    io.to(reciverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});



export const deleteMessage = catchAsyncError(async (req, res, next) => {
  let { messageIds } = req.body; // can be string or array
  const userId = req.user._id; // logged-in user

  if (!messageIds) {
    return res.status(400).json({
      success: false,
      message: "No message ID(s) provided."
    });
  }

  // Convert to array if single ID is sent
  if (!Array.isArray(messageIds)) {
    messageIds = [messageIds];
  }

  // Delete messages only if they belong to the user
  const result = await MessageModel.deleteMany({
    _id: { $in: messageIds },
    senderId: userId
  });

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} message(s) deleted.`,
  });
});