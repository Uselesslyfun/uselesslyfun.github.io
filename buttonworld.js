let ctx;
let osc1, osc2, osc3;
let gain;
let sirenInterval;

let pressCount = 0;

const mainButton = document.getElementById("mainButton");
const warningBox = document.getElementById("warningBox");
const muteButton = document.getElementById("muteButton");
const worldTitle = document.getElementById("worldTitle");

const clouds = document.querySelectorAll(".cloud");
const birds = document.querySelectorAll(".bird");
const sun = document.querySelector(".sun");

/* =========================
BUTTON CLICK SYSTEM
========================= */

mainButton.addEventListener("click", function(){

pressCount++;

if(pressCount === 1){
startAngryScene();
}

else if(pressCount === 2){
goUnderground();
}

});


/* =========================
ANGRY BUTTON GOD SCENE
========================= */

function startAngryScene(){

/* button rises */

mainButton.style.transform = "translateY(-250px)";
worldTitle.style.transform = "translateY(120px)";

/* show warning */

setTimeout(()=>{

warningBox.style.display = "block";
warningBox.innerText = "YOU SHOULDN'T BE HERE";

/* world gets angry */

sun.classList.add("angry-sun");

clouds.forEach(cloud=>{
cloud.classList.add("angry-cloud");
});

birds.forEach(bird=>{
bird.classList.add("bird-fly");
});

/* play sound */

playAngrySound();

},1200);


/* change text */

setTimeout(()=>{

warningBox.innerText = "GET OUT OF HERE";

},3500);


/* show mute button */

setTimeout(()=>{

muteButton.style.display = "inline-block";

},5000);

}


/* =========================
MUTE BUTTON GOD
========================= */

muteButton.addEventListener("click", function(){

stopAngrySound();

/* hide warning */

warningBox.style.display = "none";

/* hide mute button */

muteButton.style.display = "none";

/* calm world */

sun.classList.remove("angry-sun");

clouds.forEach(cloud=>{
cloud.classList.remove("angry-cloud");
});

birds.forEach(bird=>{
bird.classList.remove("bird-fly");
});

/* button comes back */

mainButton.style.transform = "translateY(120px)";

});


/* =========================
ANGRY SOUND
========================= */

function playAngrySound(){

ctx = new (window.AudioContext || window.webkitAudioContext)();

osc1 = ctx.createOscillator();
osc2 = ctx.createOscillator();
osc3 = ctx.createOscillator();

gain = ctx.createGain();

osc1.connect(gain);
osc2.connect(gain);
osc3.connect(gain);

gain.connect(ctx.destination);

gain.gain.value = 0.8;

osc1.type = "sawtooth";
osc2.type = "square";
osc3.type = "triangle";

osc1.start();
osc2.start();
osc3.start();

let t = 0;

sirenInterval = setInterval(()=>{

let freq = 300 + Math.sin(t) * 900;

osc1.frequency.value = freq;
osc2.frequency.value = freq + 40;
osc3.frequency.value = freq - 40;

t += 0.5;

},20);

}

function stopAngrySound(){

if(sirenInterval) clearInterval(sirenInterval);

if(osc1) osc1.stop();
if(osc2) osc2.stop();
if(osc3) osc3.stop();

}


/* =========================
UNDERGROUND SCENE
========================= */

function goUnderground(){

/* hide surface */

mainButton.style.display = "none";
worldTitle.style.display = "none";
warningBox.style.display = "none";
muteButton.style.display = "none";

sun.style.display = "none";

clouds.forEach(c=>c.style.display="none");
birds.forEach(b=>b.style.display="none");

/* show underground */

let underground = document.getElementById("undergroundScene");

underground.style.display = "flex";
underground.style.pointerEvents = "auto";

/* spawn chaos buttons */

spawnButtons();

}


/* =========================
100 CHAOS BUTTONS
========================= */

function spawnButtons(){

const chaos = document.getElementById("buttonChaos");

for(let i=0;i<100;i++){

let btn = document.createElement("button");

btn.innerText = "BUTTON";
btn.className = "chaos-button";

btn.style.position = "absolute";
btn.style.left = Math.random()*window.innerWidth + "px";
btn.style.top = Math.random()*window.innerHeight + "px";

chaos.appendChild(btn);

}

}