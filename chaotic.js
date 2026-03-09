let scene = 1;

function nextScene(){

if(scene === 1){

document.getElementById("sceneImage").src = "man1.png";
document.getElementById("dialogue").innerText =
"Ahhh.. I'm too bored...";

scene = 2;

}

else if(scene === 2){

document.getElementById("sceneImage").src = "man2.png";
document.getElementById("dialogue").innerText =
"WTF IS HAPPENING.. TO MY PC ???";

document.getElementById("laptopGlow").style.opacity = "0.7";
document.querySelector(".sparks").style.opacity = "1";

scene = 3;

}

}
