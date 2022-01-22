import * as socketio from "socket.io";
import { addHistoryObject } from "../controller/history.controller";


export const handleHistoryRelatedEvents = (socket: socketio.Socket) => {

    // ! HANDLING CONNTED EVENT
    socket.on("socket-connection-success", ({ socketId, connectionStatus, userName, userId }) => {
        addHistoryObject(socketId, connectionStatus, userName, userId);
    });

    // ! HANDLING DISCONNECTED EVENT
    socket.on("socket-disconnected", ({ socketId, connectionStatus, userName, userId }) => {
        addHistoryObject(socketId, connectionStatus, userName, userId);
    });
}