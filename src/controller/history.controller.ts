import HistorySchemaInstance from '../schemas/history.schema';

export const AddHistoryObject = (socketId: string, connectionStatus: string, userName: string, userId: string) => {
    const historyObject = new HistorySchemaInstance({
        socketId: socketId,
        connectionStatus: connectionStatus,
        userName: userName,
        userId: userId
    });

    historyObject.save();
}