
// Variable to store the list of guesses 
let guesses = [];
// Variable for store the correct random number 
let correctNumber = getRandomNumber();

window.onload = function () {
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);

  var input = document.getElementById("number-guess");

  input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("number-submit").click();
    }
    if (event.keyCode === 27) {
      initGame();
    }
  });
}

/**
 * Functionality for playing the whole game
 */
function playGame() {
  let numberGuess = document.getElementById("number-guess").value;
  if (numberGuess > 100 || numberGuess < 1) {
    showOutOfRange();
  } else {
    displayResult(numberGuess);
    saveGuessHistory(numberGuess);
    displayHistory();
  }
}

/**
 * Show the result for if the guess it too high, too low, or correct
 */
function displayResult(numberGuess) {
  if (numberGuess > correctNumber) {
    showNumberAbove()
  } else if (numberGuess < correctNumber) {
    showNumberBelow()
  } else {
    showYouWon()
  }
}


/**
 * Initialize a new game by resetting all values and content on the page
 */
function initGame() {
  document.getElementById("number-guess").value = "";
  correctNumber = getRandomNumber();
  resetResultContent();
  guesses = [];
  displayHistory();
}

/**
 * Reset the HTML content for guess history
 */
function resetResultContent() {
  document.getElementById("result").innerHTML = "";
}

/** 
 * Return a random number between 1 and 100
 */
function getRandomNumber() {
  let correctNumber = Math.floor(Math.random() * 100 + 1);
  return correctNumber;
}

/**
 * Save guess history 
 */
function saveGuessHistory(guess) {
  guesses.push(guess);
}

/**
 * Display guess history to user
 */
function displayHistory() {
  let index = guesses.length - 1;
  let list = "<ul class='list-group'>";
  while (index >= 0) {
    list += "<li class='list-group-item'>You guessed " + guesses[index] + "</li>";
    index--;
  }
  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}

/**
 * Retrieve the dialog based on if the guess is wrong or correct 
 */
function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
    case "danger":
      dialog = "<div class='alert alert-danger' role='alert'>";
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

function showYouWon() {
  let guessesCount = guesses.length + 1;
  let text;
  if (guessesCount == 1) {
    text = "Unbelievable! You got it in " + guessesCount + " guesses!";
  } else if ((guessesCount > 0) && (guessesCount <= 5)) {
    text = "Awesome! You got it in " + guessesCount + " guesses!";
  } else if ((guessesCount > 5) && (guessesCount <= 10)) {
    text = "Good job! You got it in " + guessesCount + " guesses!";
  } else {
    text = "Better later than never! You got it in " + guessesCount + " guesses!";
  }
  let dialog = getDialog('won', text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberAbove() {
  const text = "Guess " + (guesses.length + 1) + ": Too high!"
  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
  const text = "Guess " + (guesses.length + 1) + ": Too low!"
  let dialog = getDialog('warning', text);
  document.getElementById("result").innerHTML = dialog;
}

function showOutOfRange() {
  const text = "You must choose a number between 1 and 100!"
  let dialog = getDialog("danger", text);
  document.getElementById("result").innerHTML = dialog;
}
