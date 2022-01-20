"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = mongoose_1.default.Schema;
const user = new UserSchema({
    name: String,
    totalMessages: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model('UserSchema', user);
