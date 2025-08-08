import express from 'express';
import {
    deleteMessage,
    getAllusers,
    getMessages,
    sendMessage
} from "../Controllers/messageController.js"
import authentacationMidelaver from '../Middlewares/authentacationMidelaver.js';

const router = express.Router();


router.get('/users',authentacationMidelaver,getAllusers);
router.get('/:id',authentacationMidelaver,getMessages);
router.post('/send/:id',authentacationMidelaver,sendMessage)
router.delete('/messages',authentacationMidelaver,deleteMessage)
export default router;