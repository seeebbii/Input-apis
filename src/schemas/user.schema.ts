import mongoose from "mongoose";
const UserSchema = mongoose.Schema;

const user = new UserSchema({
    
    name: String,
    secret: String,
    ipAddress: String,
    userCreatedAt: Date,


},  { timestamps: true })

const UserSchemaInstance = mongoose.model('UserSchema', user);

export default UserSchemaInstance;