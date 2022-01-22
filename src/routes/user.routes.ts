import express from 'express';
import {checkIfUserExists} from '../controller/user.controller'
const router = express.Router();


router.get('/', (req, res)=>{
    res.json({
        'routes': "User routes"
    })
})

router.post('/', checkIfUserExists);





export default router;
