import HistorySchemaInstance from '../schemas/history.schema';
import * as socketio from "socket.io";

export const addHistoryObject = (socketId: string, connectionStatus: string, userName: string, userId: string, socket: socketio.Socket ) => {
    const historyObject = new HistorySchemaInstance({
        socketId: socketId,
        connectionStatus: connectionStatus,
        userName: userName,
        userId: userId
    });

    historyObject.save();

    if(connectionStatus === 'Connected'){
        socket.broadcast.emit("listen-new-user", {
            "userName": userName,
            "socketId": socketId,
            "userId": userId,
         });
    }

    
}