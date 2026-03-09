let scene = 0;

function nextScene(){

scene++;

if(scene == 1){
document.querySelector(".scene-img").src = "house2.png";
document.querySelector(".dialogue").innerText = "Time to check my laptop.";
}

}