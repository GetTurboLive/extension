// const socket = io("https://refactored-space-fishstick-5gx9qpgwvxvc5pg-3000.app.github.dev/", {
//   withCredentials: true
// });
const socket = new WebSocket(
  "wss://refactored-space-fishstick-5gx9qpgwvxvc5pg-8080.app.github.dev/"
);

console.log("Enabled TurboLive - JSON updater!");

const emptyJSON = '{"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["my variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"backdrop1","dataFormat":"svg","assetId":"cd21514d0531fdffb22204e0ec5ed84a","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Sprite1","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"costume1","bitmapResolution":1,"dataFormat":"svg","assetId":"592bae6f8bb9c8d88401b54ac431f7b6","md5ext":"592bae6f8bb9c8d88401b54ac431f7b6.svg","rotationCenterX":44,"rotationCenterY":44}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}'
let oldJSON = ''

socket.onopen = () => {
  interval = setInterval(() => {
    let projectJSON = window.vm.toJSON();
    if (projectJSON != emptyJSON && projectJSON != oldJSON) {
      socket.send(JSON.stringify({ name: "update", message: projectJSON }));
    }
    oldJSON = window.vm.toJSON();
  }, 500);

  socket.onmessage = (event) => {
    parsedJSON = JSON.parse(event.data);
    if (parsedJSON.name == "update") {
      window.vm.loadProject(parsedJSON.message);
      console.log(parsedJSON.message);
    }
  };
};
