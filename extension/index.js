const socket = io("https://refactored-space-fishstick-5gx9qpgwvxvc5pg-3000.app.github.dev/", {
  withCredentials: true
});

const form = document.getElementById("form");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    const input = document.getElementById("input");
    e.preventDefault();
    if (input.value) {
        socket.emit("msg", input.value);
        input.value = "";
    }
});

socket.on("msg", (msg) => {
    const newmsg = document.createElement("p")
    newmsg.textContent = msg
    messages.prepend(newmsg)
    window.vm.loadProject(msg)
})
