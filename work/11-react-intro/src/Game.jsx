import { useState } from "react";
import { compareWords, isValid5LetterWord } from "./compare";

function Game({ username, onLogout }) {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const secretWord = "RECAT";

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid5LetterWord(guess)) {
      setMessage(
        `"${guess}" was not a valid word, word must consist of 5 letters`,
      );
    } else if (guess.toUpperCase() === secretWord) {
      setMessage(`Congratulations！ "${guess}" is the secret word!`);
    } else {
      const commonLetters = compareWords(guess, secretWord);
      setMessage(`"${guess}" had ${commonLetters} letter(s) in common`);
    }

    setGuess("");
  }

  return (
    <div className="game">
      <div className="game-header">
        <h2>Welcome, {username}!</h2>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="game-content">
        <p className="game-instructions">
          Enter a 5-letter word to see if it matches the secret word.
        </p>

        <form className="game-form" onSubmit={handleSubmit}>
          <label className="form-label">
            <span>Your guess: </span>
            <input
              className="form-input"
              value={guess}
              onInput={(e) => setGuess(e.target.value)}
            />
          </label>
          <button className="form-button">Submit</button>
        </form>

        {message && <div className="game-message">{message}</div>}
      </div>
    </div>
  );
}

export default Game;
