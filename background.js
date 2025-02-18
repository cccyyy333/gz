
import EasySeeSo from './node_modules/seeso/easy-seeso.js';
const script = document.createElement('script');
script.src = chrome.runtime.getURL('showGaze.js'); 
(document.head || document.documentElement).appendChild(script);


const licenseKey = "dev_731p0anvsp0p3jcezqy52tgid4dk29ofju76hgam"



function onGaze(gazeInfo) {
  showGaze(gazeInfo)
}


function onDebug(FPS, latency_min, latency_max, latency_avg){
}

async function main() {
  const seeSo = new EasySeeSo();
  await seeSo.init(licenseKey,
    () => {
    seeSo.setMonitorSize(13);
    seeSo.setFaceDistance(40);
    seeSo.setCameraPosition(window.outerWidth / 2, true);
    seeSo.startTracking(onGaze, onDebug)
          }, // callback when init succeeded.
    () => console.log("callback when init failed"),  // callback when init failed.
)
}

main();