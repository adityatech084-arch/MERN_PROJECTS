import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import {configDotenv} from 'dotenv'
import db_connect from './dbconnection.js';
import userRouter from './routes/user.router.js'
import multer from 'multer';
import MessageRouter from './routes/message.router.js'
// import multer from 'multer'
configDotenv();
db_connect().catch((err)=>console.log(err));

const app = express();


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
    methods:["GET","POST","PUT"],
     exposedHeaders: ['Content-Disposition'],
}));

app.use(cookieParser());
// app.use(fileUpload())
// const upload = multer({})

app.use(fileUpload({ useTempFiles: true}));


app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.use('/api/v1/user',userRouter);
app.use('/api/v1/message',MessageRouter)




export default app;
