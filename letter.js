// set function with varible letter and isGuessed with isGuessed set to false

function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

// if isGuessed is false, return _, else return the letter
    this.getCharacter = function() {
      if(!this.isGuessed) {
        return "_";
      } else {
        return this.letter;
      }
    }
  // check the guessed letter against the actual letter, if true return the letter
    this.checkLetter = function(guess) {
      if(guess === this.letter) {
        this.isGuessed = true;
      }
    }
  }
  // export letter to word
  module.exports = Letter;