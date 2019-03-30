// require word.js and npm inquirier

Word = require("./word.js");
inquirer = require("inquirer");

// set word array
wordArr = [
  "germanium", "silicon", "nitrogen", "carbon", "nitrogen","argon", "cobalt", "helium", "hydrogen", "oxygen", "lithium", "boron", "bromine", "titanium", "tungsten", "aluminum", "chromium", "copper", "sodium", "gold", "silver"
];

// set varibles
var guesses;
var pickedWords;
var word;
var pickedWord;

// initialize function, pick word, console log game name, start game
function init() {
  pickedWords = [];
  console.log("============================================");
  console.log("Word Guess Game - Periodic Table of Elements");
  console.log("============================================");
  playGame();
}

// set function playGame, set pickedWord to empty, set guesses to 12 loop through 
function playGame() {
  pickedWord = "";
  guesses = 12;
  if (pickedWords.length < wordArr.length) {
    pickedWord = getWord();
  } else {

    console.log("You won!");
    continuePrompt();
  }
  if (pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    choose();
  }
}

function getWord() {
  let rand = Math.floor(Math.random() * wordArr.length);
  let randomWord = wordArr[rand];
  if (pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function choose() {
  let checker = [];
  inquirer.prompt([
    {
      name: "pickedLetter",
      message: word.update() + "\nNumber of guesses left: " + guesses +
        "\nEnter a letter!"

    }
  ])
    .then(data => {
      word.letters.forEach(letter => {
        letter.checkLetter(data.pickedLetter);
        checker.push(letter.getCharacter());
      });
      if (guesses > 0 && checker.indexOf("_") !== -1) {
        guesses--;
        if (guesses === 0) {
          console.log("=======================================");
          console.log("Sorry, you lost.  Better luck next time");
          console.log("=======================================");
          continuePrompt();
        } else {
          choose();
        }
      } else {
        console.log("===============================================");
        console.log("");
        console.log(word.update());
        console.log("");
        console.log("Congratulations, you guessed the correct word!");
        console.log("===============================================");
        
        playGame();
      }
    });
}

function continuePrompt() {
  inquirer.prompt([
    {
      name: "continue",
      type: "list",
      message: "Would you like to play again?",
      choices: ["Yes", "No"]
    }
  ])
    .then(data => {
      if (data.continue === "Yes") {
        init();
      } else {
        console.log("Thanks for playing!");
      }
    });
}

init();