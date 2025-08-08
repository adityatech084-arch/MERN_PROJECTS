import mongoose from "mongoose";


let UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        public_id:String,
        url:String
    }
},{timestamps:true})



const UserModel = mongoose.model('users',UserSchema);


export default UserModel;