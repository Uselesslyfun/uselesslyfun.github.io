// ==========================
// QUESTIONS
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

const relationshipLabels = [
  "Emotionally Stable Icon",
  "Walking Red Flag Detector",
  "Hopeless Romantic",
  "Certified Delulu",
  "Soft but Dangerous",
  "Low Tolerance Legend",
  "Situationship Survivor",
  "Main Character Energy"
];

let current = 0;
let score = 0;
let gameEnded = false;
let watcherTriggered = false;


// ==========================
// SOUND ENGINE (FORCE SAFE)
// ==========================
function createSound(url){
  const audio = new Audio(url);
  audio.preload = "auto";
  return audio;
}

const correctSound = createSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
const wrongSound = createSound("https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3");
const booSound = createSound("https://assets.mixkit.co/active_storage/sfx/1562/1562-preview.mp3");
const clapSound = createSound("https://assets.mixkit.co/active_storage/sfx/366/366-preview.mp3");
const horrorSound = createSound("https://assets.mixkit.co/active_storage/sfx/253/253-preview.mp3");
const notifSound = createSound("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");

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
  watcherTriggered = false;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  loadQuestion();

  // 👁 GUARANTEED WATCH MESSAGE
  setTimeout(triggerWatcher, 2500);

  // 💬 EX MESSAGE QUICK
  setTimeout(showExMessage, 4000);

  // 🔔 RANDOM MID NOTIFICATIONS
  setTimeout(randomNotification, 6000);
  setTimeout(randomNotification, 10000);
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
// ANSWER
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
  }, 500);
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
  let label = relationshipLabels[Math.floor(Math.random()*relationshipLabels.length)];

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

  document.getElementById("relationshipLabel").innerText =
    "Your Relationship Type: " + label;
}


// ==========================
// AUTO SCREENSHOT GENERATOR
// ==========================
function downloadResultImage(){
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#121212";
  ctx.fillRect(0,0,600,400);

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Red Flag Green Flag", 150, 80);

  ctx.font = "50px Arial";
  ctx.fillText(score + "/8", 250, 180);

  ctx.font = "20px Arial";
  ctx.fillText("Play now at yoursite.com", 180, 300);

  const link = document.createElement("a");
  link.download = "my-score.png";
  link.href = canvas.toDataURL();
  link.click();
}


// ==========================
// SHARE
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
    alert(text);
  }
}


// ==========================
// ESCAPE
// ==========================
function escapePage(){
  window.location.href = "index.html";
}


// ==========================
// WATCHER FIXED
// ==========================
function triggerWatcher(){
  if(watcherTriggered) return;
  watcherTriggered = true;

  playSound(horrorSound);

  const msg = document.createElement("div");
  msg.innerText = "Someone is watching you play.";
  msg.style.position = "fixed";
  msg.style.top = "15%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "black";
  msg.style.color = "red";
  msg.style.padding = "20px";
  msg.style.border = "2px solid red";
  msg.style.zIndex = "9999";
  msg.style.fontSize = "20px";

  document.body.appendChild(msg);

  setTimeout(()=>{
    msg.remove();
  }, 2000);
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
  }, 2000);
}


// ==========================
// RANDOM MID GAME NOTIF
// ==========================
function randomNotification(){
  if(gameEnded) return;

  const messages = [
    "Your friend just sent you this game.",
    "Someone screenshot their result.",
    "3 people just failed this question.",
    "Your ex is online.",
    "You are being judged."
  ];

  const popup = document.createElement("div");
  popup.innerText = messages[Math.floor(Math.random()*messages.length)];
  popup.style.position = "fixed";
  popup.style.bottom = "60px";
  popup.style.right = "20px";
  popup.style.background = "#333";
  popup.style.color = "white";
  popup.style.padding = "12px";
  popup.style.borderRadius = "8px";
  popup.style.zIndex = "9999";

  playSound(notifSound);
  document.body.appendChild(popup);

  setTimeout(()=>{
    popup.remove();
  },2000);
}
