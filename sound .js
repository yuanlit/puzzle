let body = document.querySelector('body');
let audio1 = document.createElement('audio');
    audio1.id = "audio1";
    audio1.src = "./sound/move.wav";
    audio1.style.opacity = 0;
    audio1.style.display = "none";
    body.appendChild(audio1);
let movePalyer =  document.getElementById("audio1");
// 移动时音效
function movePlay(){
    movePalyer.play();
}

let audio2 = document.createElement('audio');
    audio2.id = "audio2";
    audio2.src = "./sound/win.mp3";
    audio2.style.opacity = 0;
    audio2.style.display = "none";
    body.appendChild(audio2);
let movePalyer1 =  document.getElementById("audio2");

// 胜利时音效
function winPalyer(){
    movePalyer1.play();
}