const startButton = document.getElementById("startButton");

function injectScript() {
  chrome.runtime.sendMessage({
    message: "popup"
  })
}

document.addEventListener("DOMContentLoaded", function () { 
  startButton.addEventListener("click", () => {
    injectScript();
  });
});