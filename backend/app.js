import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import groupRoutes from "./routes/group.route.js";
import { configDotenv} from "dotenv"
configDotenv();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())






app.use("/api/v1/auth/user", userRouter);

app.use("/api/v1/message",messageRouter);


app.use("/api/v1/groups", groupRoutes);



export default app;