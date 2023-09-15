const socket = io("https://refactored-space-fishstick-5gx9qpgwvxvc5pg-3000.app.github.dev/", {
  withCredentials: true
});

console.log("Enabled TurboLive - JSON updater!");

interval = setInterval(() => {
    let projectJSON = window.vm.toJSON();
    socket.emit("update", projectJSON);
}, 500);

socket.on("update", (data) => {
    window.vm.loadProject(data);
})
