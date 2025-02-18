document.addEventListener("DOMContentLoaded", () => {
  const startTrackingBtn = document.getElementById("startTracking");


  startTrackingBtn.addEventListener("click", () => {
    //chrome.runtime.sendMessage({ action: "start" });
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  });
});
