// 🧠 Starter Word Guess Game — Keyboard Input Ready
let gameActive = true;

// Word bank
var words = ["javascript", "array", "loop", "variable"];


// Randomly select one word from the list
let chosenWord = words[Math.floor(Math.random() * words.length)];

// Track guessed letters and remaining attempts
let guessedLetters = [];
let attempts = 10;
let arrayUnderscore = [];
let arrayChosenWord = [];
arrayChosenWord = chosenWord.split("");

//HTML Elements
const attemptsLeft = document.getElementById("attempts");
attemptsLeft.textContent = attempts;

const lettersAlreadyGuessed = document.getElementById("guessedLetters");
lettersAlreadyGuessed.textContent = "None yet";

const underscore = document.getElementById("maskedWord");
underscore.textContent = "_ _ _ _ _";

const successSound = document.getElementById("successSound");
const failureSound = document.getElementById("failureSound");



// Log the chosen word for debugging
console.log("Chosen word:", chosenWord);

const restartGame = () => {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log("Chosen word:", chosenWord);
    guessedLetters = [];
    attempts = 10;
    maskString(chosenWord);
    lettersAlreadyGuessed.textContent = "None yet";
    arrayChosenWord = chosenWord.split("");
    attemptsLeft.textContent = attempts;
}

// 🎮 Function students will build next
function startGame(letter) {
  console.log(`You pressed: ${letter}`);
  // TODO:
  // 1️⃣ Build a masked string using underscores for letters not yet guessed.
  
  // 2️⃣ Track guessed letters and remaining attempts.

  // 3️⃣ Detect win or loss and display a message.

  // 4️⃣ (Bonus) Show guessed letters and progress dynamically in the console or DOM.
    
    calculateAttemps(letter);

}

const maskString = (word) => {
    arrayUnderscore=[];
    
    for (let i=0; i< word.length; i++) {
       arrayUnderscore.push("_");
    }
    console.log(arrayUnderscore);
    underscore.textContent = arrayUnderscore.join(" ");
}

maskString(chosenWord);

const calculateAttemps = (letter) => {
    if (guessedLetters.includes(letter)) {
        console.log("Letter already guessed");
        console.log(guessedLetters);
        return ;
    }
    else {
        guessedLetters.push(letter);
        console.log(guessedLetters);

        if (chosenWord.includes(letter)) {
            console.log(`${letter} belongs to chosen word`);
            successSound.currentTime = 0;
            successSound.play();
            // Update underscores for all occurrences of the letter
            for (let i=0; i<arrayChosenWord.length; i++) {
                if (arrayChosenWord[i]===letter) {
                    arrayUnderscore[i] = letter;
                }
            };
            
            
        }
        else {
            console.log(`${letter} does not belong to chosen word`);
            failureSound.currentTime = 0;
            failureSound.play();
            attempts --;
            attemptsLeft.textContent = attempts;
        };
        
        //Updating the DOM
        underscore.textContent = arrayUnderscore.join(" ");
        lettersAlreadyGuessed.textContent = guessedLetters.join(", ").toUpperCase();
    }

    //Win or lose scenario;
    if (arrayUnderscore.join("") === arrayChosenWord.join("")) {
        gameActive = false;
        underscore.classList.add("successAnimation");
        setTimeout(() => {
            underscore.classList.remove("successAnimation");
            alert(`You did it! The word was ${arrayChosenWord.join("").toUpperCase()}`)
            restartGame();
        }, 1000);
        
        
    }
    else if (attempts === 0) {
        gameActive = false;
        underscore.classList.add("failureAnimation");
        setTimeout(() => {
            underscore.classList.remove("failureAnimation");
            alert(`What a loser! The word was ${arrayChosenWord.join("").toUpperCase()}`)
            restartGame();
        },1000);
    }

    
};

// ⌨️ Listen for keyboard input when the page loads
window.addEventListener("keydown", function (event) {
    if (!gameActive) return;
    let key = event.key.toLowerCase();

    // Only process alphabetic letters (ignore Shift, Enter, etc.)
    if (key.match(/^[a-z]$/)) {
        startGame(key);
    } else {
        console.log("Please press a valid letter (A–Z).");
    }
});
