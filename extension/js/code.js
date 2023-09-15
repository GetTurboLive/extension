// const socket = io("https://refactored-space-fishstick-5gx9qpgwvxvc5pg-3000.app.github.dev/", {
//   withCredentials: true
// });
const socket = new WebSocket(
  "wss://refactored-space-fishstick-5gx9qpgwvxvc5pg-8080.app.github.dev/"
);

console.log("Enabled TurboLive - JSON updater!");

socket.onopen = () => {
  interval = setInterval(() => {
    let projectJSON = window.vm.toJSON();
    socket.send(`{ name: "update", message: ${projectJSON} }`);
  }, 500);

  socket.onmessage = (event) => {
    if (event.data.name == "update") {
      window.vm.loadProject(event.data.message);
      console.log(event.data.message)
    }
  };
};
