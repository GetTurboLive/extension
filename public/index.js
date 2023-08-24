var socket = io();

var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("msg", input.value);
        input.value = "";
    }
});