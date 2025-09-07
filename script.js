const words = ["PYTHON", "NOTEBOOK", "HANGMAN", "PROGRAMMING"];
let word = words[Math.floor(Math.random() * words.length)];
let guessed = Array(word.length).fill("_");
let wrongGuesses = 0;

function setButtonsEnabled(enabled) {
  document.querySelectorAll("#letters button").forEach(b => (b.disabled = !enabled));
}

function render() {
  // Build the blanks as spans
  const wordEl = document.getElementById("word");
  wordEl.innerHTML = ""; // clear

  guessed.forEach((ch) => {
    const span = document.createElement("span");
    span.className = "letter-slot";
    // show letter if guessed, otherwise keep blank (just the underline)
    if (ch !== "_") span.textContent = ch;
    wordEl.appendChild(span);
  });

  // Update hangman image
  document.getElementById("hangman-image").src = `images/hangman${wrongGuesses + 1}.png`;
}

function guessLetter(letter, btn) {
  btn.disabled = true;
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) guessed[i] = letter;
    }
  } else {
    wrongGuesses++;
  }
  render();

  const msgEl = document.getElementById("message");
  if (!guessed.includes("_")) {
    msgEl.textContent = "🎉 You Win!";
    setButtonsEnabled(false);
  } else if (wrongGuesses >= 6) {
    msgEl.textContent = `💀 Game Over! Word was: ${word}`;
    setButtonsEnabled(false);
  }
}

// create letter buttons
const lettersDiv = document.getElementById("letters");
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l => {
  const btn = document.createElement("button");
  btn.textContent = l;
  btn.onclick = () => guessLetter(l, btn);
  lettersDiv.appendChild(btn);
});

render();