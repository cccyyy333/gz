window.addEventListener("message", (event) => {
  if (event.data.type === "sandbox_log") {
    console.log("📢 Sandbox:", event.data.message);
  }
});



  (function () {
    // iframe 생성
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";  // UI에 보이지 않게 설정
    iframe.src = chrome.runtime.getURL("sandbox.html");
    document.body.appendChild(iframe);
  
    // iframe이 로드된 후 `sandbox.html`에 메시지 전송
    iframe.onload = () => {
      iframe.contentWindow.postMessage({ command: "startTracking" }, "*");
    };
    console.log("iframe")

    // sandbox.html에서 오는 메시지 수신
    window.addEventListener("message", (event) => {
      if (event.origin !== chrome.runtime.getURL("")) {
        return;  // 보안상 다른 출처의 메시지는 무시
      }
  
      if (event.data.status === "tracking_started") {
        console.log("Seeso tracking started!");
      } else if (event.data.gazeData) {
        console.log("Received gaze data:", event.data.gazeData);
      }
    });
  })();
  
  navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    console.log("카메라 접근 성공", stream);
  })
  .catch((error) => {
    console.error("카메라 접근 실패:", error);
  });