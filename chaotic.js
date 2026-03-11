let scene = 1;

function nextScene(){

// SCENE 1
if(scene === 1){

document.getElementById("sceneImage").src = "man1.png";

document.getElementById("dialogue").innerText =
"Ahhh.. I'm too bored...";

scene = 2;

}

// SCENE 2
else if(scene === 2){

document.getElementById("sceneImage").src = "man2.png";

document.getElementById("dialogue").innerText =
"WTF IS HAPPENING.. TO MY PC ???";

document.getElementById("laptopGlow").style.opacity = "0.7";

document.querySelector(".sparks").style.opacity = "1";

scene = 3;

}

// SCENE 3 → TITLE SCREEN
else if(scene === 3){

document.getElementById("sceneImage").style.display = "none";

document.getElementById("dialogue").style.display = "none";

document.getElementById("laptopGlow").style.display = "none";

document.querySelector(".sparks").style.display = "none";

document.getElementById("titleScreen").style.display = "flex";

scene = 4;

}

}


// RED BUTTON CLICK

function startGame(){

document.getElementById("titleScreen").style.display="none";

let screen = document.getElementById("awakeningScreen");
let text = document.getElementById("awakeningText");

screen.style.display="flex";

text.innerHTML = "YOU HAVE AWAKENED THE BUTTON";

playJumpscare();

setTimeout(()=>{

text.innerHTML = "YOU SHOULDN'T HAVE DONE THAT.";

document.body.classList.add("chaosMode");
text.classList.add("flickerText");

/* SHOW RUN BUTTON */

let btn = document.getElementById("runButton");

btn.style.display="block";

moveButton();

},3000);

}
function playJumpscare(){

const ctx = new (window.AudioContext || window.webkitAudioContext)();

/* create multiple oscillators for loudness */

let osc1 = ctx.createOscillator();
let osc2 = ctx.createOscillator();
let osc3 = ctx.createOscillator();

let gain = ctx.createGain();

osc1.connect(gain);
osc2.connect(gain);
osc3.connect(gain);

gain.connect(ctx.destination);

/* maximum safe gain */

gain.gain.value = 1;

/* aggressive wave */

osc1.type = "sawtooth";
osc2.type = "square";
osc3.type = "triangle";

osc1.start();
osc2.start();
osc3.start();

let t = 0;

let siren = setInterval(()=>{

let freq = 300 + Math.sin(t) * 900;

osc1.frequency.value = freq;
osc2.frequency.value = freq + 40;
osc3.frequency.value = freq - 40;

t += 0.5;

},20);

/* stop after 4 seconds */

setTimeout(()=>{

clearInterval(siren);

osc1.stop();
osc2.stop();
osc3.stop();

},4000);

}
function moveButton(){

let btn = document.getElementById("runButton");

document.addEventListener("mousemove",function(e){

let x = Math.random() * (window.innerWidth - 200);
let y = Math.random() * (window.innerHeight - 100);

btn.style.left = x + "px";
btn.style.top = y + "px";

});

btn.onclick = function(){

window.location.href = "buttonworld.html";

};

}
