console.log("test");
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    console.log("카메라 접근 성공", stream);
  })
  .catch((error) => {
    console.error("카메라 접근 실패:", error);
  });
