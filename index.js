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
    if (exclude != e) {
      console.log({name: [event], message: data }.toString())
      e.send(JSON.stringify({ name: [event], message: data }));
    }
  });
}

let newdata = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["my variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"backdrop1","dataFormat":"svg","assetId":"cd21514d0531fdffb22204e0ec5ed84a","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Sprite1","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"costume1","bitmapResolution":1,"dataFormat":"svg","assetId":"592bae6f8bb9c8d88401b54ac431f7b6","md5ext":"592bae6f8bb9c8d88401b54ac431f7b6.svg","rotationCenterX":44,"rotationCenterY":44}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}'

ws.on("connection", (socket) => {
  console.log("user connected");
  socket.send(JSON.stringify({ name: "update", message: newdata.message }))
  socket.on("message", (data) => {
    newdata = JSON.parse(data);
    console.log("new data: " + newdata);
    if (newdata.name == "update") {
      console.log("update");
      emit(newdata.name, newdata.message, socket);
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
