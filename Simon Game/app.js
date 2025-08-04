// Arrays to store the game's sequence and the user's sequence
let gameSeq = [];
let userSeq = [];

// Available button colors
let btns = ["yellow", "red", "blue", "green"];

// Game state variables
let started = false; // Tracks if the game has started
let level = 0; // Tracks the current level

// High score (load from localStorage if exists)
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;

// Selecting headings
let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score");
highScoreDisplay.innerText = `High Score: ${highScore}`;

// Listen for any key press to start the game
document.addEventListener("keypress", function () {
  if (started == false) {
    // Start only if not already started
    started = true;
    levelup(); // Begin the first level
  }
});

// Adds a "flash" animation to a button (for game sequence)
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// Adds a "flash" animation to indicate user's button press
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Increases level and adds a new random color to the sequence
function levelup() {
  userSeq = []; // Reset user's input for the new level
  level++;
  h2.innerText = `Level ${level}`;

  // Generate a random color
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor); // Add color to the game sequence
  gameFlash(randBtn); // Flash the chosen button
}

// Checks if the user's input matches the game's sequence
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    // If current input matches
    if (userSeq.length == gameSeq.length) {
      // If user has completed the sequence, go to next level
      setTimeout(levelup, 1000);
    }
  } else {
    // Update high score if current score is greater
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    // If the input is wrong, show game over message
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "rgb(220, 53, 69)";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "White";
    }, 150);
    reset(); // Reset the game
  }
}

// Handles when the user clicks a button
function btnPress() {
  let btn = this;
  userFlash(btn); // Flash button to show click
  userColor = btn.getAttribute("id"); // Get clicked button color
  userSeq.push(userColor); // Add to user's sequence
  checkAns(userSeq.length - 1); // Check user's input
}

// Attach click event to all buttons
let allBtn = document.querySelectorAll(".color");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

// Resets the game state
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
