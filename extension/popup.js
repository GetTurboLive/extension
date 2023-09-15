function injectScript() {
  chrome.runtime.sendMessage({
    message: "inject"
  })
}

document.addEventListener("DOMContentLoaded", function () { 
  injectScript();
});