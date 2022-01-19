import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from "socket.io";

const app = express();
dotenv.config();

app.use(cors(), (req, res, next) => {
    next()
})

app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use(express.json({ limit: '1000mb' }));

const httpServer = app.listen(process.env.PORT, ()=> console.log(`Server running on port: ${process.env.PORT}`))

const io = new Server(httpServer);

io.of('/').on("connection", (socket) => {
    console.log(socket.id);
    
});
