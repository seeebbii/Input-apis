import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as socketio from "socket.io";
import mongoose from 'mongoose';
import mongoUri from './service/uri';
import nodeCron from 'node-cron';

// ! IMPORTING DB CONTROLLERS
import { handleHistoryRelatedEvents } from './events/history.event';
import { handleConnectionStatusEvents } from './events/connectionStatus.event';


// ! IMPORTING CHAT CONTROLLER
import { addChatObject } from './controller/chat.controller';

// ! IMPORTING APPLICATION ROUTES
import userRoutes from './routes/user.routes';
import ChatSchemaInstance from './schemas/chat.schema';
import chatRoutes from './routes/chat.routes';
import HistorySchemaInstance from './schemas/history.schema';

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

// ! CLEARING MY DATABASE EVERY 30 MINUTES
var task = nodeCron.schedule('*/30 * * * *', () => {
    
    console.log("Clearing the chat collection");
    ChatSchemaInstance.deleteMany({}, (res) => {
        console.log("DB CLEARED");
    })

}, {
    scheduled: true
});

task.start()

app.use(express.json({ limit: '1000mb' }));

//! CONNECTING MONGOOSE 
mongoose.connect(process.env.MONGO_URI || mongoUri, { useNewUrlParser: true } as mongoose.ConnectOptions).then(() => console.log('MongoDb Connected')).catch((err) => console.log(err));
const httpServer = app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))

const io = new socketio.Server(httpServer, { allowEIO3: true } as socketio.ServerOptions);



io.on("connection", (socket) => {
    console.log("Socket Connected: ", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("disconncted", { "socket-id": socket.id });
    });    

    // HANDLING CONNECTION STATUS EVENTS
    // WHEN A SOCKET IS CONNECTED OR DISCONNECTED TO SERVER
    handleConnectionStatusEvents(socket, io);

    // io.emit("newUser", { "message": "Fetch Active Users" });

    // HANDLING HISTORY EVENTS
    // STORING SOCKET DETAILS ON CONNECTION AND DISCONNECTION
    handleHistoryRelatedEvents(socket);

    socket.on("receive_message", (chatModel) =>{

        const newChatObject = new ChatSchemaInstance({
            userId: chatModel.userId,
            name: chatModel.name,
            message: chatModel.message,
            messagId: chatModel.messagId,
            ssentDate: chatModel.sentDate,
        });
    
        io.emit('send_message', newChatObject.toJSON());
        
        addChatObject(chatModel);
    })


    // ! FINDING AND BROADCAST A NEW USER 
    HistorySchemaInstance.findOne({ socketId:socket.id }, (err: any, history: any) => {
        console.log(history)
        socket.broadcast.emit("connected", { "activeUser": history });
    })



    

});

//! SETTING UP ROUTES
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);