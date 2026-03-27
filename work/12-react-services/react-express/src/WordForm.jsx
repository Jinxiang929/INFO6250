import { useState, useEffect } from 'react';
import { MESSAGES, SERVER } from './constants';

function WordForm({ word }) {

  const [newWord, setNewWord ] = useState(word);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setNewWord(word || '');
  }, [word]);

  function onSubmit(e) {
    e.preventDefault(); 
    
    if (!newWord.trim()) {
      setErrorMessage(MESSAGES[SERVER.REQUIRED_WORD]);
      return;
    }

    if(!newWord.match(/^[A-Za-z]*$/)) {
      setErrorMessage(MESSAGES[SERVER.INVALID_WORD]);
      return;
    }
    setIsEditing(false);
    setErrorMessage('');
  }

  function onCancel() {
    setNewWord(word || '');
    setIsEditing(false);
    setErrorMessage('');
  }

  function onTyping(e) {
    setNewWord(e.target.value);
    setErrorMessage('')
  }

  if (isEditing) {
    return (
      <div className="word">
        <form className="word__form" action="#/word" onSubmit={onSubmit}>
          <label className="word__label">
            <span>Update your word: </span>
            <input 
              className="word__input"
              value={newWord}
              onChange={onTyping}
            />
          </label>
          <div className="word__actions">
            <button type="submit" className="word__submit">Save</button>
            <button type="button" className="word__cancel" onClick={onCancel}>Cancel</button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="word">
      <div className="word__display">
        <p className="word__text">{ word || 'No word set yet'}</p>
        <button 
          className="word__edit" 
          onClick={() => setIsEditing(true)}
        >
          Update Word
        </button>
      </div>
    </div>
  );
  
}

export default WordForm;