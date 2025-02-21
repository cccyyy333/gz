document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startTracking").addEventListener("click", () => {
    console.log("Start Tracking 버튼 클릭됨!");

    // background.js에 메시지 전송
    chrome.runtime.sendMessage({ action: "startTracking" });
  });
});
