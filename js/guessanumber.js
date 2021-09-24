// Generate the random number between 1 and 1000
let randomNumber = Math.floor(Math.random() * 1000 + 1);

// Count of guesses
let guess = 0;
let start = new Date();

//Using one function to complete the process of counting and checking if the number is bigger, smaller or correct
document.getElementById("submitguess").onclick = function () {

  //Check if your tries are above 10, if it is, the game is lost
  //Uses stop and elapsed variables to figure out the time elapsed from start to finish
  if (guess == 10) {
    let stop = new Date();
    let elapsed = (stop - start) / 1000 + " Seconds";
    document.getElementById("timeImport").innerHTML = elapsed;
    alert(
      "You have not guessed correctly in 10 turns, and lost the game. Reload to try again !"
    );
    return;
  }

  // Number guessed by user
  let guessNumber = document.getElementById("guessField").value;

  //If you guess correctly !
  if (guessNumber == randomNumber) {
    alert("You are correct !, you guessed it with " + guess + " guesses!");
  } else if (guessNumber > randomNumber) {
    //If the guess is bigger than the number
    guess++;
    alert("Incorrect, try going smaller.");
  } else {
    //If the guess is smaller than the number
    guess++;
    alert("Incorrect, try going bigger.");
  }
  document.getElementById("guessImport").innerHTML = guess;
};

