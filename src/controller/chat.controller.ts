import ChatSchemaInstance from '../schemas/chat.schema';

export const addChatObject = (chatModel: any) =>{
    const newChatObject = new ChatSchemaInstance({
        userId: chatModel.userId,
        name: chatModel.name,
        message: chatModel.message,
        sentDate: Date.now()
    });

    newChatObject.save();
}
