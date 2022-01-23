import UserSchemaInstance from '../schemas/user.schema';
import {Request, Response, NextFunction} from 'express';


const romanize = (original: number): string => {
    if (original < 1 || original > 3999) {
      throw new Error('Error: Input integer limited to 1 through 3,999');
    }
  
    const numerals = [
      ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
      ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
      ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
      ['M', 'MM', 'MMM'], // 1000-3000
    ];

    const digits = Math.round(original).toString().split('');
    let position = (digits.length - 1);
  
    return digits.reduce((roman, digit) => {
      if (digit !== '0') {
        roman += numerals[position][parseInt(digit) - 1];
      }
  
      position -= 1;
  
      return roman;
    }, '');
  }



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
                var romanizedLenght: Number | String = 0;
                if(totalUsers.length == 0){
                    romanizedLenght = 0;
                }else{
                    romanizedLenght = romanize(totalUsers.length)
                }

                const newUser = new UserSchemaInstance({
                    name: `Spyder ${romanizedLenght}`,
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


export const getUserById = (req : Request, res : Response, next: NextFunction) => {
    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    UserSchemaInstance.findById(req.params.id).then((user) => {
        if(user){
            user.ipAddress = clientIp;
            UserSchemaInstance.updateOne({_id: req.params.id},{"ipAddress": clientIp} ).then((updatedUser) => {
                res.status(200).json(user);
            })
        }else{
            res.status(404).json({
                message: "User not found"
            })
        }
    }).catch((err) => {
        res.status(404).json({
            message: "Something went wrong",
            error: err
        })
    })
}