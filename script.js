const scenarios = [
    { text: "He says 'I don't drink water. I only drink Coke.'", answer: "red" },
    { text: "She sends you a 12-slide PowerPoint on why you're cute.", answer: "green" },
    { text: "He types with one finger like a 70-year-old uncle.", answer: "red" },
    { text: "She sends you memes mid-argument.", answer: "green" },
    { text: "He says 'gym is my personality.'", answer: "red" },
    { text: "She remembers your WiFi password.", answer: "green" },
    { text: "He says 'I don't need sleep. Sleep needs me.'", answer: "red" },
    { text: "She orders extra fries 'just in case you want some.'", answer: "green" },
    { text: "He unironically says 'rizz'.", answer: "red" },
    { text: "She makes playlists titled 'Us but in a movie'.", answer: "green" },
    { text: "He says pineapple on pizza is a personality trait.", answer: "red" },
    { text: "She sends 'text me when you reach home.'", answer: "green" },
    { text: "He claps when Marvel logo appears.", answer: "red" },
    { text: "She hypes you up before a presentation like you're in the Olympics.", answer: "green" }
];

const scenarioText = document.getElementById("scenario");
const redBtn = document.getElementById("redBtn");
const greenBtn = document.getElementById("greenBtn");

let currentIndex = 0;
let score = 0;

function loadScenario() {
    if (currentIndex < scenarios.length) {
        scenarioText.textContent = scenarios[currentIndex].text;
    } else {
        showFinalScore();
    }
}

function playBeep(isCorrect) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "square";

    if (isCorrect) {
        oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1400, audioContext.currentTime + 0.2);
    } else {
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.3);
    }

    gainNode.gain.setValueAtTime(1.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
}

function flashScreen(color) {
    document.body.style.backgroundColor = color;

    setTimeout(() => {
        document.body.style.backgroundColor = "#111";
        currentIndex++;
        loadScenario();
    }, 800);
}

function checkAnswer(choice) {
    const correctAnswer = scenarios[currentIndex].answer;

    if (choice === correctAnswer) {
        score++;
        playBeep(true);
        flashScreen("green");
    } else {
        playBeep(false);
        flashScreen("red");
    }
}

function showFinalScore() {
    scenarioText.innerHTML = `
        🎉 GAME OVER 🎉 <br><br>
        You scored <b>${score}</b> out of ${scenarios.length}. <br><br>
        ${getScoreMessage()}
    `;

    redBtn.style.display = "none";
    greenBtn.style.display = "none";
}

function getScoreMessage() {
    if (score === scenarios.length) {
        return "You are the Supreme Relationship Judge.";
    } else if (score > scenarios.length / 2) {
        return "You have decent standards. Respect.";
    } else {
        return "Please stay single for now.";
    }
}

redBtn.addEventListener("click", () => checkAnswer("red"));
greenBtn.addEventListener("click", () => checkAnswer("green"));

loadScenario();