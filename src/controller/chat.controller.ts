import ChatSchemaInstance from '../schemas/chat.schema';
import express from 'express';


export const addChatObject = (chatModel: any) =>{
    const newChatObject = new ChatSchemaInstance({
        userId: chatModel.userId,
        name: chatModel.name,
        message: chatModel.message,
        messagId: chatModel.messagId,
        sentDate: chatModel.sentDate,
    });

    newChatObject.save();
}

export const getAllChat = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    ChatSchemaInstance.find({}, (err, chats) => {
        if (err) {
            res.status(500).json({
                "message": "Error fetching chats"
            })
        } else {
            res.status(200).json(chats);
        }
    })
}
