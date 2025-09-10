// ✅ Educational Quotes about HTML, CSS, JavaScript
const quotes = [
  // HTML
  "HTML stands for Hyper Text Markup Language.",
  "The h1 tag defines the largest heading in HTML.",
  "The a tag is used to create hyperlinks.",
  "Images are added using the img tag with src and alt attributes.",
  "The div tag is a container for other HTML elements.",
  "Lists can be ordered ol or unordered ul.",

  // CSS
  "CSS is used to style HTML elements.",
  "Inline CSS is written inside the style attribute.",
  "The color property sets the text color.",
  "Flexbox helps in creating responsive layouts.",
  "The position property can be relative absolute or fixed.",
  "The background color property changes the background of an element.",

  // JavaScript
  "JavaScript makes websites interactive and dynamic.",
  "Variables can be declared using var let or const.",
  "The document getElementById method selects an element by its id.",
  "Functions in JavaScript are defined using the function keyword.",
  "The addEventListener method attaches an event to an element.",
  "Arrays in JavaScript are used to store multiple values in one variable.",
  "Objects are collections of key value pairs in JavaScript."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const countdownEl = document.getElementById("countdown");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const finalWpmEl = document.getElementById("finalWpm");
const finalAccuracyEl = document.getElementById("finalAccuracy");

let time = 60;
let timer = null;
let currentQuote = "";
let score = 0;
let correctChars = 0;
let totalTyped = 0;
let isRunning = false;

// Load random quote
function loadQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[index];
  quoteEl.textContent = currentQuote;
}

// Start game with countdown
function startGame() {
  if (isRunning) return;
  let countdown = 3;
  countdownEl.textContent = countdown;
  countdownEl.classList.remove("hidden");

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownEl.textContent = countdown;
    } else {
      clearInterval(interval);
      countdownEl.classList.add("hidden");
      beginTyping();
    }
  }, 1000);
}

function beginTyping() {
  loadQuote();
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  time = 60;
  score = 0;
  correctChars = 0;
  totalTyped = 0;
  isRunning = true;

  scoreEl.textContent = 0;
  timerEl.textContent = time;

  if (timer) clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  startBtn.disabled = true;
  restartBtn.disabled = false;
}

// Timer
function updateTimer() {
  if (time === 0) {
    finishGame();
  } else {
    time--;
    timerEl.textContent = time;
  }
}

// Check typing
inputEl.addEventListener("input", () => {
  if (!isRunning) return;

  const inputText = inputEl.value;
  totalTyped++;

  let correctSoFar = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === currentQuote[i]) {
      correctSoFar++;
    }
  }
  correctChars = correctSoFar;

  // If user finished sentence
  if (inputText.trim() === currentQuote.trim()) {
    score += 10; // Bonus points
    loadQuote();
    inputEl.value = "";
  }

  // Accuracy
  let accuracy = (correctChars / totalTyped) * 100;
  accuracy = accuracy || 100;
  accuracyEl.textContent = Math.round(accuracy) + "%";

  // Words per minute
  const wordsTyped = inputText.trim().split(" ").filter(w => w !== "").length + score / 10;
  const timeSpent = (60 - time) / 60;
  const wpm = timeSpent > 0 ? Math.round(wordsTyped / timeSpent) : 0;
  wpmEl.textContent = wpm;

  scoreEl.textContent = score;
});

// Finish Game
function finishGame() {
  clearInterval(timer);
  inputEl.disabled = true;
  isRunning = false;

  // Show game over screen
  finalScoreEl.textContent = score;
  finalWpmEl.textContent = wpmEl.textContent;
  finalAccuracyEl.textContent = accuracyEl.textContent;
  gameOverScreen.classList.remove("hidden");
}

// Restart Game
function restartGame() {
  clearInterval(timer);
  inputEl.value = "";
  inputEl.disabled = true;
  quoteEl.textContent = "";
  timerEl.textContent = "60";
  scoreEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  isRunning = false;

  startBtn.disabled = false;
  restartBtn.disabled = true;
  gameOverScreen.classList.add("hidden");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
