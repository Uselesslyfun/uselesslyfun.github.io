// QUESTIONS
const questions = [
  "They post 'single life lowkey peaceful' while actively dating.",
  "They repost relationship quotes but won’t claim you.",
  "They make a playlist named after you.",
  "They start arguments before going out 'just in case.'",
  "They hype your selfies in comments, not just DMs.",
  "They call you 'bro' in public but 'baby' in private.",
  "They actually delete dating apps without you asking.",
  "They say 'I like crazy people' and then trigger you on purpose."
];

const answers = [
  "red","red","green","red",
  "green","red","green","red"
];

const labels = [
  "Certified Delulu",
  "Emotionally Intelligent Icon",
  "Hopeless Romantic",
  "Low Tolerance Legend",
  "Situationship Survivor"
];

let current = 0;
let score = 0;
let gameStarted = false;

// AUDIO (must be created AFTER click)
let correctSound;
let wrongSound;
let horrorSound;
let booSound;
let clapSound;


// START GAME
function startGame(){

  // Create audio after user click (Chrome fix)
  correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
  wrongSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3");
  horrorSound = new Audio("https://assets.mixkit.co/active_storage/sfx/253/253-preview.mp3");
  booSound = new Audio("https://assets.mixkit.co/active_storage/sfx/1562/1562-preview.mp3");
  clapSound = new Audio("https://assets.mixkit.co/active_storage/sfx/366/366-preview.mp3");

  gameStarted = true;
  current = 0;
  score = 0;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  loadQuestion();

  // WATCHER guaranteed
  setTimeout(showWatcher, 2000);
}


// LOAD QUESTION
function loadQuestion(){
  if(current >= questions.length){
    endGame();
    return;
  }

  document.getElementById("questionCounter").innerText =
    "Q" + (current+1) + " / " + questions.length;

  document.getElementById("questionText").innerText =
    questions[current];
}


// ANSWER
function answer(choice){
  let correct = answers[current];

  if(choice === correct){
    score++;
    document.body.style.background = "#153d1c";
    correctSound.play();
  } else {
    document.body.style.background = "#3d1515";
    wrongSound.play();
  }

  setTimeout(()=>{
    document.body.style.background = "#121212";
    current++;
    loadQuestion();
  },500);
}


// END GAME
function endGame(){

  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  let total = questions.length;
  document.getElementById("finalScore").innerText =
    score + " / " + total;

  let quote = "";
  if(score <= 2){
    quote = "Certified walking red flag.";
    booSound.play();
  }
  else if(score <= 5){
    quote = "You survive… barely.";
  }
  else{
    quote = "Elite standards. Respect.";
    clapSound.play();
  }

  document.getElementById("finalQuote").innerText = quote;

  let fakePlayers = 1000 + Math.floor(Math.random()*4000);
  document.getElementById("livePlayers").innerText =
    fakePlayers + " people played this hour.";

  let randomLabel = labels[Math.floor(Math.random()*labels.length)];
  document.getElementById("relationshipLabel").innerText =
    "Your Relationship Type: " + randomLabel;
}


// WATCHER
function showWatcher(){
  horrorSound.play();

  const msg = document.createElement("div");
  msg.innerText = "Someone is watching you play.";
  msg.style.position = "fixed";
  msg.style.top = "20%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "black";
  msg.style.color = "red";
  msg.style.padding = "20px";
  msg.style.border = "2px solid red";
  msg.style.zIndex = "9999";

  document.body.appendChild(msg);

  setTimeout(()=>{
    msg.remove();
  },2000);
}


// SHARE
function shareResult(){
  let text = "I scored " + score + "/8 on Red Flag Green Flag.";
  alert(text);
}


// IMAGE DOWNLOAD
function downloadResultImage(){
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#121212";
  ctx.fillRect(0,0,600,400);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("Red Flag Green Flag", 120,100);

  ctx.font = "60px Arial";
  ctx.fillText(score + "/8", 250,220);

  const link = document.createElement("a");
  link.download = "my-score.png";
  link.href = canvas.toDataURL();
  link.click();
}


// ESCAPE
function escapePage(){
  window.location.href = "index.html";
}
