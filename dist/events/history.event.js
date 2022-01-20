"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHistoryRelatedEvents = void 0;
const history_controller_1 = require("../controller/history.controller");
const handleHistoryRelatedEvents = (socket) => {
    // ! HANDLING CONNTED EVENT
    socket.on("socket-connection-success", ({ socketId, connectionStatus, userName, userId }) => {
        (0, history_controller_1.AddHistoryObject)(socketId, connectionStatus, userName, userId);
    });
    // ! HANDLING DISCONNECTED EVENT
    socket.on("socket-disconnected", ({ socketId, connectionStatus, userName, userId }) => {
        (0, history_controller_1.AddHistoryObject)(socketId, connectionStatus, userName, userId);
    });
};
exports.handleHistoryRelatedEvents = handleHistoryRelatedEvents;
