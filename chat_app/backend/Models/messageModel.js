import mongoose from "mongoose";


let messsageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true
    },
    text:String,
    media:String

},{timestamps:true});


const messageModel=mongoose.model('messages',messsageSchema);


export default messageModel;