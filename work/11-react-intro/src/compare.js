export function compareWords( word, guess ) {  

  function letterCountsOf( someWord ) {
    const letterCounts = {};

    someWord.toLowerCase().split('').forEach( letter =>{
      letterCounts[letter] = letterCounts[letter] + 1 || 1;
    });

    return letterCounts;
  }

  const wordCounts = letterCountsOf(word);
  const guessCounts = letterCountsOf(guess);
  let matchedLetter = 0;

  for( const letter in guessCounts ){
    const wordCount = wordCounts[letter] || 0;
    const guessCount = guessCounts[letter] || 0;
    matchedLetter += Math.min( wordCount, guessCount );
  }
  return matchedLetter;
}

  
  export function isValid5LetterWord(word) {
    return word?.length === 5;
  }
  
  export function isValidUsername(username) {

    return username?.trim()?.match(/^[A-Za-z0-9_]+$/) !== null;
  }




