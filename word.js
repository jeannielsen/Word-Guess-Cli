// require letter.js
const Letter = require("./letter.js");

// create function word and set varibles
function Word(word) {
  this.word = word;
  this.letters = [];

  // make wordArr by spliting the word into letters
  this.makeLetters = function() {
    let wordArr = this.word.split("");
    for(let i = 0; i < wordArr.length; i++) {
      let newLetter = new Letter(wordArr[i]);
      this.letters.push(newLetter);
    }
  }
// check each letter against the guess
  this.makeGuess = function(guess) {
    this.letters.forEach(letter => {
      letter.checkLetter(guess);
    });
  }

  this.update = function() {
    let printedWord = "";
    this.letters.forEach(letter => {
      printedWord += letter.getCharacter() + " ";
    });
    return printedWord;
  }
}

module.exports = Word;