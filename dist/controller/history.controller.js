"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddHistoryObject = void 0;
const history_schema_1 = __importDefault(require("../schemas/history.schema"));
const AddHistoryObject = (socketId, connectionStatus, userName, userId) => {
    const historyObject = new history_schema_1.default({
        socketId: socketId,
        connectionStatus: connectionStatus,
        userName: userName,
        userId: userId
    });
    historyObject.save();
};
exports.AddHistoryObject = AddHistoryObject;
