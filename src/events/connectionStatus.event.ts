import * as socketio from "socket.io";
import ChatSchemaInstance from "../schemas/chat.schema";

export const handleConnectionStatusEvents = async (socket: socketio.Socket, io: socketio.Server) => {


    // NOTIFY A NEW USER IS CONNECTED (WHEN USER CONNECTS)
    // socket.broadcast.emit("message", { "message": `A new user connected to ${socket.id}` });
    // NOTIFY A NEW USER IS DISCONNECTED (WHEN USER DISCONNECTS)


    // ! GETTING LAST 15 ENTRIES OF CHAT FROM DB

    const oldChhat = await  ChatSchemaInstance.find().sort({ createdAt: -1 }).limit(15).then((docs) =>docs);
    console.log(oldChhat)
    // ! HANDLING CONNTED EVENT
    socket.emit("connection", { "Status": "Connected", "Socket-Id": socket.id, "old-chat":  oldChhat});


    // ! HANDLING DISCONNECTED EVENT
    socket.on("disconnect", () => {
        io.emit("message", { "message": `A user disconnected from ${socket.id}` });
    });


}