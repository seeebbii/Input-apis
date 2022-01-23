import express from 'express';
import {getAllChat } from '../controller/chat.controller'
const router = express.Router();


router.get('/', getAllChat);


export default router;
