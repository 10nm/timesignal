
function howread (time, AMPM) {
    matubi2 = time.slice(-2);
    sentou4 = time.slice(0, 4)
    
    let speech;
    if (matubi2 == "00") {
        speech = new SpeechSynthesisUtterance(`${AMPM} 、 ${sentou4} ちょうど をお知らせします`);
    } else {
        speech = new SpeechSynthesisUtterance(`${AMPM} 、 ${time} をお知らせします`);
    }
    return speech;
}


function speech (currentTime) {
    const AMPM = currentTime.getHours() < 12 ? '午前' : '午後';
    const timeInMilliseconds = currentTime.getTime();
    const timeInMillisecondsPlus3s = timeInMilliseconds + 5000;

    let time = new Date(timeInMillisecondsPlus3s)
    time = time.toLocaleTimeString("en").toString().slice(0, -3);

    let speech = howread(time, AMPM)

    speech.rate = 1.5;
    speech.volume = 0.7;

    speechSynthesis.speak(speech);
}

function updateTime () {
    const currentTime = new Date();
    const currentSeconds = currentTime.getSeconds()
    document.getElementById("time").textContent = currentTime.toLocaleTimeString("en");

    // 1s ごとのビープ / 2000hz
    const beep2000hz = document.getElementById("2000hz");
    beep2000hz.volume = 0.1;

    // 3カウントのビープ / 500hz
    const beep500hz = document.getElementById("500hz");

    // 30,60s ごとのビープ(ロング) / 1000hz
    const beep1000hz = document.getElementById("1000hz");
    beep1000hz.volume = 0.7;

    if ((currentSeconds+5) %60 ===0){
        speech(currentTime)
        beep2000hz.play()
    } else if ((currentSeconds+3) %60 ===0){
        // console.log("3!")
        beep500hz.play()
    } else if ((currentSeconds+2) %60 ===0) {
        // console.log("2!")
        beep500hz.play()
    } else if ((currentSeconds+1) %60 ===0) {
        // console.log("1!")
        beep500hz.play()
    } else if (currentSeconds %60 ===0) {
        // console.log("60!")
        beep1000hz.play()

    } else if ((currentSeconds+5) %30 ===0) {
        speech(currentTime)
        beep2000hz.play()
    } else if ((currentSeconds+3) %30 ===0) {
        // console.log("3!")
        beep500hz.play()
    } else if ((currentSeconds+2) %30 ===0) {
        // console.log("2!")
        beep500hz.play()
    } else if ((currentSeconds+1) %30 ===0) {
        // console.log("1!")
        beep500hz.play()
    } else if (currentSeconds %30 ===0) {
        // console.log("30!")
        beep1000hz.play()
    }

    else if ((currentSeconds+5) %10 === 0) {
        speech(currentTime)
        beep2000hz.play()
    }
    
    else if (currentSeconds %10 ===0) {
        // console.log("10!")
        beep1000hz.play()
    } else {
        // console.log("1")
        beep2000hz.play()
    }
}

setInterval(updateTime, 1000);
updateTime();

