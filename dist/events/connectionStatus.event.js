"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnectionStatusEvents = void 0;
const handleConnectionStatusEvents = (socket, io) => {
    // NOTIFY A NEW USER IS CONNECTED (WHEN USER CONNECTS)
    // socket.broadcast.emit("message", { "message": `A new user connected to ${socket.id}` });
    // NOTIFY A NEW USER IS DISCONNECTED (WHEN USER DISCONNECTS)
    // ! HANDLING CONNTED EVENT
    socket.emit("connection", { "Status": "Connected", "Socket-Id": socket.id });
    // ! HANDLING DISCONNECTED EVENT
    socket.on("disconnect", () => {
        io.emit("message", { "message": `A user disconnected from ${socket.id}` });
    });
};
exports.handleConnectionStatusEvents = handleConnectionStatusEvents;
