console.log("background.js 실행됨!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTracking") {
    console.log("popup에서 startTracking 메시지 수신!");

    // 현재 활성 탭 가져오기
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;

      let tab = tabs[0];
      console.log("선택된 탭 ID:", tab.id);

      // content.js 실행
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./content.js"]
      }).then(() => {
        console.log("content.js 실행 성공!");
      }).catch((error) => {
        console.error("content.js 실행 실패:", error);
      });
    });
  }
});
