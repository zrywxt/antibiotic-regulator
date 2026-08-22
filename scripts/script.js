const vid = document.getElementById("vid");
const btn = document.getElementById("btn");
const p = document.querySelector("#result");
const keyInput = document.getElementById("keyInput");
const canvas = document.createElement("canvas");
const makeCanvas2d = canvas.getContext("2d");


// Adadfruit IO thing is vibe coded, though i read the documentation, it bounced off, happens at the last moment
const aioUsername = "zrywxt";
const feedName = "qr-data";

keyInput.value = localStorage.getItem("aio_key_store") || "";
keyInput.addEventListener("input", () => {
    localStorage.setItem("aio_key_store", keyInput.value.trim());
});

async function sendToAdafruit(qrData) {
  const aioKey = keyInput.value.trim();

  if (!aioKey) {
    p.innerText = "Please enter API Key above.";
    return;
  }

  const url = `https://io.adafruit.com/api/v2/${aioUsername}/feeds/${feedName}/data`;

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "X-AIO-Key": aioKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value: String(qrData)
      })
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Successfully sent to Adafruit IO!", responseData);
      p.innerText = "Scanned and sent: " + qrData;
    } else {
      console.error("Adafruit IO Error:", responseData);
      p.innerText = "Failed to send request.";
      p.style.borderColor = "red";
    }
  } catch (error) {
    console.error("Network Error:", error);
    p.innerText = "Network error while sending.";
    p.style.borderColor = "red";
  }
}

// This scanQr() is also vibe coded

function scanQr() {
    if (vid.readyState === vid.HAVE_ENOUGH_DATA) {
        canvas.height = vid.videoHeight;
        canvas.width = vid.videoWidth;

        makeCanvas2d.drawImage(vid, 0, 0, canvas.width, canvas.height);
        const rawQr = makeCanvas2d.getImageData(0, 0, canvas.width, canvas.height);
        const cream = jsQR(rawQr.data, rawQr.width, rawQr.height);

        if (cream) {
            console.log("The camera reads it's:", cream.data);
            p.innerText = cream.data;
            stopQr();
            sendToAdafruit(cream.data);
            return;
        }
    }
    if (incominVideo) {
        requestAnimationFrame(scanQr);
    }
}

const recordingPrefrences = {
    video: { facingMode: { ideal: "environment" } },
    audio: false
};

let incominVideo = null;

async function recordQr() {
    try {
        incominVideo = await navigator.mediaDevices.getUserMedia(recordingPrefrences);
        vid.srcObject = incominVideo;
        requestAnimationFrame(scanQr);
        btn.textContent = "Stop";
    } catch(someError) {
        console.log(someError);
    }
}
// This stopQr functionaly is also vibe coded
function stopQr() {
    if (incominVideo) {
        incominVideo.getTracks().forEach(track => track.stop());
        vid.srcObject = null;
        incominVideo = null;
        btn.textContent = "Start";
    }
}

btn.addEventListener("click", () => {
    if (incominVideo) {
        stopQr();
    } else {
        recordQr();
    }
});
