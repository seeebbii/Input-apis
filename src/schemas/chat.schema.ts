import mongoose from "mongoose";
const ChatSchema = mongoose.Schema;

const chat = new ChatSchema({

    userId: String, 
    name: String,
    message: String,
    messageId: String,
    sentDate: {
        type: Date,
        default: Date.now()
    }

}, {timestamps: true});

const ChatSchemaInstance = mongoose.model('ChatSchema', chat);

export default ChatSchemaInstance;