import express from 'express';
import {checkIfUserExists, getUserById } from '../controller/user.controller'
const router = express.Router();


router.get('/', (req, res)=>{
    res.json({
        'routes': "User routes"
    })
})

router.post('/', checkIfUserExists);
router.get('/:id', getUserById);





export default router;
