"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HistorySchema = mongoose_1.default.Schema;
const history = new HistorySchema({
    socketId: String,
    connectionStatus: String,
    userName: String,
    userId: String,
}, { timestamps: true });
const HistorySchemaInstance = mongoose_1.default.model('HistorySchema', history);
exports.default = HistorySchemaInstance;
