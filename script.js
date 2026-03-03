// ==========================
// QUESTIONS (answers hidden)
// ==========================
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

let current = 0;
let score = 0;
let gameEnded = false;


// ==========================
// SOUND ENGINE (REAL FILES)
// ==========================

const correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3");
const booSound = new Audio("https://assets.mixkit.co/active_storage/sfx/1562/1562-preview.mp3");
const clapSound = new Audio("https://assets.mixkit.co/active_storage/sfx/366/366-preview.mp3");
const horrorSound = new Audio("https://assets.mixkit.co/active_storage/sfx/253/253-preview.mp3");

// ensure replay works
function playSound(sound){
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(()=>{});
}


// ==========================
// START GAME
// ==========================

function startGame(){
  current = 0;
  score = 0;
  gameEnded = false;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  loadQuestion();

  // 👀 EARLY WATCH MESSAGE
  setTimeout(()=>{
    showWatcherMessage();
  }, 3000);

  // 💬 EX MESSAGE QUICKER
  setTimeout(()=>{
    showExMessage();
  }, 5000);
}


// ==========================
// LOAD QUESTION
// ==========================

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


// ==========================
// ANSWER HANDLER
// ==========================

function answer(choice){
  if(gameEnded) return;

  let correct = answers[current];

  if(choice === correct){
    score++;
    document.body.style.backgroundColor = "#1e4d2b";
    playSound(correctSound);
  }else{
    document.body.style.backgroundColor = "#4d1e1e";
    playSound(wrongSound);
  }

  setTimeout(()=>{
    document.body.style.backgroundColor = "#121212";
    current++;
    loadQuestion();
  }, 600);
}


// ==========================
// END GAME
// ==========================

function endGame(){
  if(gameEnded) return;
  gameEnded = true;

  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  let total = questions.length;
  let resultText = score + " / " + total;
  let quote = "";

  if(score <= 2){
    quote = "Certified walking red flag.";
    playSound(booSound);
  }
  else if(score <= 5){
    quote = "You survive… but barely.";
  }
  else{
    quote = "Elite standards. Respect.";
    playSound(clapSound);
  }

  let fakePlayers = 1500 + Math.floor(Math.random()*5000);

  document.getElementById("finalScore").innerText = resultText;
  document.getElementById("finalQuote").innerText = quote;
  document.getElementById("livePlayers").innerText =
    fakePlayers + " people played in the last hour.";
}


// ==========================
// SHARE BUTTON
// ==========================

function shareResult(){
  let text = "I scored " + score + "/8 on Red Flag Green Flag. Can you beat me?";

  if(navigator.share){
    navigator.share({
      title: "Red Flag Green Flag",
      text: text,
      url: window.location.href
    });
  }else{
    alert("Copy this:\n\n" + text);
  }
}


// ==========================
// RESTART
// ==========================

function restartGame(){
  location.reload();
}


// ==========================
// ESCAPE BUTTON
// ==========================

function escapePage(){
  window.location.href = "index.html";
}


// ==========================
// HORROR WATCH MESSAGE
// ==========================

function showWatcherMessage(){
  playSound(horrorSound);

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
  msg.style.fontSize = "18px";

  document.body.appendChild(msg);

  setTimeout(()=>{
    msg.remove();
  },2000);
}


// ==========================
// EX MESSAGE
// ==========================

function showExMessage(){
  const popup = document.createElement("div");
  popup.innerText = "Your ex just viewed your profile.";
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "#222";
  popup.style.color = "white";
  popup.style.padding = "15px";
  popup.style.borderRadius = "10px";
  popup.style.zIndex = "9999";

  document.body.appendChild(popup);

  setTimeout(()=>{
    popup.remove();
  },2000);
}
