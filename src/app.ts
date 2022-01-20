import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as socketio from "socket.io";
import mongoose from 'mongoose';
import mongoUri from './service/uri';

// ! IMPORTING DB CONTROLLERS
import { AddHistoryObject } from './controller/history.controller';
import { handleHistoryRelatedEvents } from './events/history.event';
import { handleConnectionStatusEvents } from './events/connectionStatus.event';

const app = express();
dotenv.config();

app.use(cors(), (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    res.json({
        'Client': clientIp,
        "Server": "Running!"
    });
})

app.use(express.json({ limit: '1000mb' }));

//! CONNECTING MONGOOSE 
mongoose.connect(process.env.MONGO_URI || mongoUri, { useNewUrlParser: true } as mongoose.ConnectOptions).then(() => console.log('MongoDb Connected')).catch((err) => console.log(err));
const httpServer = app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))

const io = new socketio.Server(httpServer);


io.on("connection", (socket) => {

    // HANDLING CONNECTION STATUS EVENTS
    // WHEN A SOCKET IS CONNECTED OR DISCONNECTED TO SERVER
    handleConnectionStatusEvents(socket, io);

    // HANDLING HISTORY EVENTS
    // STORING SOCKET DETAILS ON CONNECTION AND DISCONNECTION
    handleHistoryRelatedEvents(socket);


});
