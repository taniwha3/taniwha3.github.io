const correctWord = "tatty";  // Set your word here
let currentRow = 0;

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        grid.appendChild(cell);
    }
});

function submitGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 5) {
        alert("Guess must be 5 letters!");
        return;
    }

    const grid = document.getElementById("grid");
    const cells = grid.children;

    for (let i = 0; i < 5; i++) {
        const cell = cells[currentRow * 5 + i];
        cell.textContent = guess[i];
        if (guess[i] === correctWord[i]) {
            cell.classList.add("correct");
        } else if (correctWord.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
    }

    currentRow++;
    guessInput.value = "";
    if (guess === correctWord) {
        alert("You guessed it!");
    } else if (currentRow === 6) {
        alert(`Game over! The correct word was ${correctWord}.`);
    }
}
