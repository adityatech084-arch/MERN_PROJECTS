import express from 'express'
import {
  signin,
  signout,
  signup,
  getUser,
  updateProfile,
} from '../Middlewares/userController.js'
import authentacationMidelaver from '../Middlewares/authentacationMidelaver.js';
import multer from 'multer';
const upload=multer({});
const router = express.Router();

router.post('/sign-up',authentacationMidelaver(signup))
router.post('/sign-in',authentacationMidelaver(signin));
router.get('/sign-out',authentacationMidelaver,signout);
router.get('/me',authentacationMidelaver,getUser)
router.put('/update-profile',authentacationMidelaver,updateProfile);


export default router;


