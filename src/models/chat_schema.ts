import mongoose from "mongoose";
const ChatSchema = mongoose.Schema;

const chat = new ChatSchema({

    

}, {timestamps: true});


export default  mongoose.model('ChatSchema', chat);