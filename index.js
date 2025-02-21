function sandboxLog(message) {
  window.parent.postMessage({ type: "sandbox_log", message }, "*");
}

sandboxLog("🚀 sandbox.html 로드됨!");


import EasySeeSo from 'seeso/easy-seeso.js';
const script = document.createElement('script');
//script.src = chrome.runtime.getURL('showGaze.js'); 
(document.head || document.documentElement).appendChild(script);


const licenseKey = "dev_1z7i6sjuvxsff011kvlnepaz7r9clpqeszns08x3"


function onGaze(gazeInfo) {
  sandboxLog(gazeInfo);
  //showGaze(gazeInfo)
}

function onDebug(FPS, latency_min, latency_max, latency_avg){
}

async function initializeSeeso() {
  const seeSo = new EasySeeSo();
  await seeSo.init(licenseKey,
    () => {
    seeSo.setMonitorSize(13);
    seeSo.setFaceDistance(40);
    seeSo.setCameraPosition(window.outerWidth / 2, true);
    seeSo.startTracking(onGaze, onDebug);
    sandboxLog("seeso init");
          }, // callback when init succeeded.
    () => sandboxLog("callback when init failed"),  // callback when init failed.
)
}

window.addEventListener("message", async function (event) {
  if (event.data.command === "startTracking") {
    await initializeSeeso();
    event.source.postMessage({ status: "tracking_started" }, event.origin);
  } else if (event.data.command === "getGazeData") {
    const gazeData = tracker.getGazeData();
    event.source.postMessage({ gazeData: gazeData }, event.origin);
  }
});

