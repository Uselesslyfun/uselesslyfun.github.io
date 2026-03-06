const questions = [
{q:"They post single life lowkey peaceful while dating you.",correct:"red"},
{q:"They repost relationship quotes but won’t claim you.",correct:"red"},
{q:"They make a playlist named after you.",correct:"green"},
{q:"They start arguments before going out.",correct:"red"},
{q:"They hype your selfies publicly.",correct:"green"},
{q:"They call you bro in public but baby in private.",correct:"red"},
{q:"They delete dating apps without asking.",correct:"green"},
{q:"They trigger you for fun.",correct:"red"}
];

questions.sort(()=>Math.random()-0.5);

let current = 0;
let score = 0;
let wrongStreak = 0;
let finished = false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tone(freq,time){
let o=audioCtx.createOscillator();
let g=audioCtx.createGain();
o.connect(g);
g.connect(audioCtx.destination);
o.frequency.value=freq;
g.gain.value=0.2;
o.start();
setTimeout(()=>o.stop(),time);
}

function correctSound(){tone(850,150)}
function wrongSound(){tone(200,200)}
function notifySound(){tone(600,120)}

function loadQuestion(){

if(current<questions.length){

document.getElementById("question").innerText=questions[current].q;
document.getElementById("counter").innerText=
"Q"+(current+1)+" / "+questions.length;

updateProgress();

}else{
endGame();
}

}

function answer(choice){

if(finished)return;

if(choice===questions[current].correct){

score++;
wrongStreak=0;
correctSound();

}else{

wrongSound();
wrongStreak++;

}

current++;

/* WATCHER EVENT - reduced probability */

if(Math.random()<0.08){
triggerWatcher();
}

/* RAGE MODE */

if(wrongStreak>=3){
triggerRage();
wrongStreak=0;
}

setTimeout(loadQuestion,400);

}

function updateProgress(){

let percent=(current/questions.length)*100;
document.getElementById("progressBar").style.width=percent+"%";

}

/* WATCHER */

function triggerWatcher(){

let popup=document.getElementById("watcherPopup");

popup.style.display="block";

setTimeout(()=>{
popup.style.display="none";
},2500);

}

/* RAGE MODE */

function triggerRage(){

let rage=document.createElement("div");

rage.innerText="YOU KEEP MISSING RED FLAGS";

rage.style.position="fixed";
rage.style.top="50%";
rage.style.left="50%";
rage.style.transform="translate(-50%,-50%)";
rage.style.background="black";
rage.style.padding="30px";
rage.style.border="2px solid red";
rage.style.fontSize="20px";
rage.style.zIndex="999";

document.body.appendChild(rage);

setTimeout(()=>{
rage.remove();
},2000);

}

/* RESULT */

function endGame(){

finished=true;

let total=questions.length;

let title="";

if(score<=2){
title="Emotionally Blind";
}

else if(score<=5){
title="Situationally Aware";
}

else{
title="Certified Red Flag Detector";
}

let fakePlayers=Math.floor(Math.random()*3000)+7000;

document.getElementById("result").innerHTML=`

<div class="resultCard">

<h2>${score}/${total}</h2>

<p>${title}</p>

<p style="opacity:0.6;font-size:12px">
${fakePlayers.toLocaleString()} people failed this test today.
</p>

<button onclick="location.reload()">Play Again</button>

<button onclick="shareScore()">Share Result</button>

</div>

`;

}

/* SHARE */

function shareScore(){

let text="I scored "+score+" in Red Flag Detector 😎";

navigator.clipboard.writeText(text);

alert("Score copied! Send to friends.");

}

/* START */

loadQuestion();
