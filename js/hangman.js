// Wordlist
let wordlist = [
"whale", "dog", "cat", "cow", "elephant", "monkey", "horse", "mouse", "tiger", "bird", "fish",
"zebra", "deer", "dolphin", "parrot"
]

//Variable to hold a random word from the wordlist
let selectedWord = "";
//Variable to store number of blanks/underscores
let blanks = 0;
//Variable to hold the split out letters of the word 
let letters = [];
//Variable to store blanks with the correct letters
let blankAndCorrect = [];
//Variable to hold the incorrect guesses
let wrongGuess = [];
//Variable to keep track of guesses remaining
let guessesLeft = 6;

//Chooses a random word from the wordlist, and pushes it to the array
function game() {
selectedWord = wordlist[Math.floor(Math.random() * wordlist.length)];
//The split() method splits a string into an array of individual letters
letters = selectedWord.split("");
//Get the number of blanks/underscores
blanks = selectedWord.length;
for (let i = 0; i < blanks; i++) {
blankAndCorrect.push("_");
}
document.getElementById("current-word").innerHTML = " " + blankAndCorrect.join("  ");
};

//Restart the game
function reset() {
guessesLeft = 6;
wrongGuess = [];
blankAndCorrect = [];
game();
};

//Compare letters and fills in the respective blanks 
function compareLetters(userKey) {
if (wrongGuess.includes(userKey)) {
return;
}
if (selectedWord.indexOf(userKey) > -1) {
//Loops depending on the amount of blanks 
for (var i = 0; i < blanks; i++) {
//Fills in right index in the correct array
if (letters[i] === userKey) {
blankAndCorrect[i] = userKey;
}
}
}
//Wrong Keys
else {
wrongGuess.push(userKey);
guessesLeft--;
}
}

//Check wins/losses
function completeGame() {
//When the blanks are filled you win
if (letters.toString() == blankAndCorrect.toString()) {
alert("You win! " + selectedWord.toLocaleUpperCase() + " is the word!")
reset();
//When the number of guesses reaches 0 you lose
} else if (guessesLeft === 0) {
alert("You lose! " + selectedWord.toLocaleUpperCase() + " was the word!")
reset();
}
document.getElementById("current-word").innerHTML = " " + blankAndCorrect.join(" ");
document.getElementById("guesses-left").innerHTML = " " + guessesLeft;
};

//Start game
game();

//Keyboard events
document.onkeyup = function(event) {
let guesses = String.fromCharCode(event.keyCode).toLowerCase();
compareLetters(guesses);
completeGame();
document.getElementById("wrong-guesses").innerHTML = " " + wrongGuess.join(", ");
}