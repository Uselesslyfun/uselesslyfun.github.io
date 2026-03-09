let scene = 1;

function nextScene(){

// SCENE 1 → SCENE 2
if(scene === 1){

document.getElementById("sceneImage").src = "man1.png";

document.getElementById("dialogue").innerText =
"Ahhh.. I'm too bored...";

scene = 2;
}


// SCENE 2 → SCENE 3
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

// hide image and dialogue
document.getElementById("sceneImage").style.display = "none";
document.getElementById("dialogue").style.display = "none";
document.getElementById("laptopGlow").style.display = "none";
document.querySelector(".sparks").style.display = "none";

// show title screen
document.getElementById("titleScreen").style.display = "flex";

scene = 4;

}

}

function startGame(){

window.location.href = "game.html";

}
