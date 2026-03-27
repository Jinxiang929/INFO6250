import { useState } from "react";

import "./App.css";
import Login from "./Login";
import Game from "./Game";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  }

  function onLogout() {
    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Word Guessing Game</h1>
      </header>

      <main className="app-content">
        {isLoggedIn ? (
          <Game username={username} onLogout={onLogout} />
        ) : (
          <Login onLogin={onLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
