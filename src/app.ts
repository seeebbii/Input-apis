import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as socketio from "socket.io";
import mongoose from 'mongoose';
import mongoUri from './service/uri';

// ! IMPORTING DB CONTROLLERS
import { handleHistoryRelatedEvents } from './events/history.event';
import { handleConnectionStatusEvents } from './events/connectionStatus.event';


// ! IMPORTING CHAT CONTROLLER
import { addChatObject } from './controller/chat.controller';

// ! IMPORTING APPLICATION ROUTES
import userRoutes from './routes/user.routes';
import ChatSchemaInstance from './schemas/chat.schema';
import chatRoutes from './routes/chat.routes';

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

const io = new socketio.Server(httpServer, { allowEIO3: true } as socketio.ServerOptions);


io.on("connection", (socket) => {
    console.log("Socket Connected: ", socket.id);
    

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
        console.log( chatModel)
        io.emit('send_message', newChatObject.toJSON());
        
        addChatObject(chatModel);
    })

});

//! SETTING UP ROUTES
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);