import mongoose from "mongoose";
const UserSchema = mongoose.Schema;

const user = new UserSchema({
    
    name: String,
    totalMessages: Number,

},  { timestamps: true })

export default  mongoose.model('UserSchema', user);