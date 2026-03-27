import { useState, useEffect } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  POLLING_DELAY,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchUpdateWord,
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import WordForm from './WordForm';

function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); 
  const [ isWordPending, setIsWordPending ] = useState(false);
  const [ word, setWord ] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkForSession();
  }, []);

  useEffect(() => {
    let timeoutId;

    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      const pollWord = () => {
        setError('');
        fetchWord()
          .then((wordData) => {
            setWord(wordData.word);
            timeoutId = setTimeout(pollWord, POLLING_DELAY);
          })
          .catch((err) => {
            if (err?.error === SERVER.AUTH_MISSING) {
              setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
              setError(CLIENT.NO_SESSION);
            } else {
              setError(err?.error || '');
              timeoutId = setTimeout(pollWord, POLLING_DELAY);
            }
          });
      };

      pollWord();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loginStatus]);


  function onLogin( username ) {
    setError('');
    setIsLoading(true);
    fetchLogin(username)
    .then( () => { 
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchWord();
    })
    .then(wordData => {
      setWord(wordData.word);
      setIsLoading(false); 
    })
    .catch( err => {
      setIsLoading(false); 
      setError(err?.error || '');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout() 
    .catch( err => {
      setError(err?.error || '');
    });
  }

  function onRefresh() {
    setError('');
    setIsWordPending(true);

    fetchWord()
    .then( wordData => {
      setWord(wordData.word);
      setIsWordPending(false);
    })
    .catch( err => {
      setIsWordPending(false);
      setError(err?.error || ''); 
    });
  }

  function onUpdateWord(newWord) {
    setError('');
    setIsWordPending(true);

    fetchUpdateWord(newWord)
    .then(wordData => {
      setWord(wordData.word);
      setIsWordPending(false);
    })
    .catch( err => {
      setIsWordPending(false);
      setError(err?.error || '');
    });
  }

  function checkForSession() {
    setError('');
    setIsLoading(true);

    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchWord(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then( wordData => {
      setWord(wordData.word);
      setIsLoading(false);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      } else {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || ''); 
      }
      setIsLoading(false);
    });

  }


  let content;

  if(isLoading) {
    content = <Loading className="loading__app">Loading application data...</Loading>;
  } else if(loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) {
    content = <LoginForm onLogin={onLogin} isLoading={isLoading}/>;
  } else {
    content = (
      <div className="content">
        <p>Hello, {username}</p>
        <Controls onLogout={onLogout} onRefresh={onRefresh}/>
        
        <div className="word-section">
          <h1>Your Stored Word</h1>
          {isWordPending ? (
            <Loading className="word__waiting">Loading word...</Loading>
          ) : (
            <WordForm 
              word={word} 
              onUpdateWord={onUpdateWord}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="main">
        {error && <Status error={error}/>}
        {content}
      </main>
    </div>
  );
}

export default App;