//Wordlist
let wordlist = [
    "whale", "dog", "cat", "cow", "elephant", "monkey", "horse", "mouse", "tiger", "bird", "fish",
    "zebra", "deer", "dolphin", "parrot"
]

//Variable to hold a random word from the wordlist
let selectedWord = "";
//Variable to store number of underscores in the given word
let underscore = 0;
//Variable to hold the split out letters of the word 
let letters = [];
//Variable to store underscores with the correct letters
let underscoreCorrect = [];
//Variable to hold the incorrect guesses
let wrongGuess = [];
//Variable to keep track of guesses remaining
let guessesRemaining = 6;

//Chooses a random word from the wordlist
function game() {
    selectedWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    //The split() method splits a string into an array of individual letters
    letters = selectedWord.split("");
    //Get the number of underscores depending on the word
    underscore = selectedWord.length;
    for (let i = 0; i < underscore; i++) {
        underscoreCorrect.push("_");
        document.getElementById("current-word").innerHTML = " " + underscoreCorrect.join(" ");
    }
};

//Restart the game
function reset() {
    guessesRemaining = 6;
    wrongGuess = [];
    underscoreCorrect = [];
    game();
};

//Compare users keyboard clicks and fills in the respective underscores 
function compareLetters(letter) {
    if (wrongGuess.includes(letter)) {
        return;
    }
    guessedLetter = false;

    for (var i = 0; i < underscore; i++) {
        if (selectedWord[i] == letter) {
            guessedLetter = true;
        }
    }
    if (guessedLetter) {
        for (var i = 0; i < underscore; i++) {
            if (selectedWord[i] == letter) {
                underscoreCorrect[i] = letter;
            }
        }
    } else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
};

//Check wins/losses
function completeGame() {
    //When the underscores are filled you win
    if (letters.toString() == underscoreCorrect.toString()) {
        alert("You win! " + selectedWord.toLocaleUpperCase() + " is the word!")
        reset();
    //When the number of guesses reaches 0 you lose
    } else if (guessesRemaining === 0) {
        alert("You lost! " + selectedWord.toLocaleUpperCase() + " was the word!")
        reset();
    }
    document.getElementById("current-word").innerHTML = " " + underscoreCorrect.join(" ");
    document.getElementById("guesses-left").innerHTML = " " + guessesRemaining;
    document.getElementById("wrong-guesses").innerHTML = " " + wrongGuess.join(", ");
};

//Start game
game();

//Keyboard events
document.onkeyup = function (event) {
    let guesses = String.fromCharCode(event.keyCode).toLowerCase();
    compareLetters(guesses);
    completeGame();
}