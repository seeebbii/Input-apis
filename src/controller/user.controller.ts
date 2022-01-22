import UserSchemaInstance from '../schemas/user.schema';
import {Request, Response, NextFunction} from 'express';

export const checkIfUserExists = (req : Request, res : Response, next: NextFunction) => {
    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    UserSchemaInstance.findOne({secret: req.body.secret}).then((user) => {
        if(user){
            user.ipAddress = clientIp;
            UserSchemaInstance.updateOne({secret: req.body.secret},{"ipAddress": clientIp} ).then((updatedUser) => {
                res.status(200).json(user);
            })
        }else{
             UserSchemaInstance.find({}).then((totalUsers: Array<typeof UserSchemaInstance>) => {
                const newUser = new UserSchemaInstance({
                    name: `Spyder ${totalUsers.length}`,
                    secret: req.body.secret,
                    ipAddress: clientIp,
                    userCreatedAt: new Date()
                });

                newUser.save(user).then((user: typeof UserSchemaInstance) => {
                    res.status(200).json(user)
                }).catch((err: any) => {
                    res.status(400).json({
                        message: err
                    })
                })
            })
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })

}