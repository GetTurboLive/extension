const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: [
        "chrome-extension://dfnbpbnnkgpojhhkmojdogmlkhlialdf", //notfenixio
        "chrome-extension://dmpcpfggjbfibcaohmmnkdndjobcokfm" //atomic
      ],
      credentials: true
    }
  });
const port = 3000

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.send("TurboLive API")
})

io.on("connection", (socket) => {
    console.log('user connected');
    socket.on("update", (data) => {
        console.log("new data: " + data)
        socket.broadcast.emit("update", data)
    });
    socket.on("msg", (msg) => {
        console.log("received message: " + msg);
        io.emit("msg", msg)
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
})

server.listen(port, () => {
    console.log(`Server is up and running at *:${port}!`)
})