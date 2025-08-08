import mongoose from "mongoose";




const db_connect = async()=>{
   await mongoose.connect(process.env.DB_URL);
   console.log('DB_Connected..')
}


export default db_connect;