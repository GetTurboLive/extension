const startButton = document.getElementById("startButton");

function injectScript() {
  var th = document.getElementsByTagName("body")[0];
  var s = document.createElement('script');
  s.setAttribute("src", chrome.runtime.getUrl("/js/code.js"))
  th.appendChild(s);
}

document.addEventListener("DOMContentLoaded", function () { 
  startButton.addEventListener("click", () => {
    injectScript();
  });
});