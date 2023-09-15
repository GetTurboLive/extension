import express from "express";
import { WebSocketServer } from "ws";
const app = express();
const ws = new WebSocketServer({ port: 8080 });
// const express = require('express');
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//     //   origin: [
//     //     "chrome-extension://dfnbpbnnkgpojhhkmojdogmlkhlialdf", //notfenixio
//     //     "chrome-extension://dmpcpfggjbfibcaohmmnkdndjobcokfm" //atomic
//     //   ],
//       origin: "https://turbowarp.org",
//       credentials: true
//     }
//   });
const port = 3000;

function emit(event, data, exclude) {
  ws.clients.forEach((e) => {
    if (!exclude == e) {
      e.send({ name: [event], message: data });
    }
  });
}

ws.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (data) => {
    console.log("new data: " + data + "socket: " + socket);
    let e = eval(data) 
    if (e.name == "update") {
      emit(e.name, e.message, socket);
    }
  });
  socket.on("close", () => {
    console.log("user disconnected");
  });
});

// app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("TurboLive API");
});

app.listen(port, () => {
  console.log(`Server is up and running at *:${port}!`);
});
