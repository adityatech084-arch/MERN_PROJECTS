import app from "./app.js";
import {configDotenv} from "dotenv"
import dbConnect from "./config/dbconnect.js";
import http from "http";
import { initSocket } from "./utils/socket.js";
configDotenv();
const server = http.createServer(app);
initSocket(server);




dbConnect().catch((err) => console.log(err));   


server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});