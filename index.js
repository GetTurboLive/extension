const { Socket } = require('engine.io');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

io.on("connection", (socket) => {
    console.log('user connected');
    socket.on("update", (data) => {
        socket.broadcast.emit("update", data)
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("msg", (msg) => {
        console.log("received message: " + msg);
    });
})

server.listen(port, () => {
    console.log(`Server is up and running at *:${port}!`)
})