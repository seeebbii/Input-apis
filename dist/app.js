"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const socketio = __importStar(require("socket.io"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri_1 = __importDefault(require("./service/uri"));
const history_event_1 = require("./events/history.event");
const connectionStatus_event_1 = require("./events/connectionStatus.event");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)(), (req, res, next) => {
    next();
});
app.get('/', (req, res) => {
    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    res.json({
        'Client': clientIp,
        "Server": "Running!"
    });
});
app.use(express_1.default.json({ limit: '1000mb' }));
//! CONNECTING MONGOOSE 
mongoose_1.default.connect(process.env.MONGO_URI || uri_1.default, { useNewUrlParser: true }).then(() => console.log('MongoDb Connected')).catch((err) => console.log(err));
const httpServer = app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
const io = new socketio.Server(httpServer);
io.on("connection", (socket) => {
    // HANDLING CONNECTION STATUS EVENTS
    // WHEN A SOCKET IS CONNECTED OR DISCONNECTED TO SERVER
    (0, connectionStatus_event_1.handleConnectionStatusEvents)(socket, io);
    // HANDLING HISTORY EVENTS
    // STORING SOCKET DETAILS ON CONNECTION AND DISCONNECTION
    (0, history_event_1.handleHistoryRelatedEvents)(socket);
});
