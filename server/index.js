import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    console.log(socket.id)
    /* client tan gelen mesajı karışılıyoruz */
    socket.on("room",(data)=>{
      socket.join(data)
    })

    socket.on("message",(data)=>{
       socket.to(data.room).emit("messageReturn",data)
    })
})

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});