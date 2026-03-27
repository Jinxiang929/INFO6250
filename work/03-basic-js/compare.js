"use strict";

module.exports = compare; 

function compare( word, guess ) {  

  word = word.toUpperCase();
  guess = guess.toUpperCase();

  let count = 0;
  const letterDict = {};
/*
first time try to use array, convert String to char array
  const wordArray = [...word];
  const guessArray = [...guess];
*/

//second time try to find if object is better than use array
  for (let letter of word){
    if (!letterDict[letter]) {
      letterDict[letter] = 0;  // init other value, if not the value would be undefined
      }
    letterDict[letter] += 1;
        }

  for (let letter of guess){
    if (letterDict[letter] > 0){
      letterDict[letter] -= 1;
      count++;
      }
    }
//can use object directly and don't need to convert, better way to use
  return count;
}
