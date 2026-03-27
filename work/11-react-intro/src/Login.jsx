import { useState } from "react";
import { isValidUsername } from "./compare";

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!loginName.trim()) {
      setErrorMessage("Username cannot be empty");
      return;
    }

    if (loginName.toLowerCase() === "dog") {
      setErrorMessage('User "dog" is not allowed');
      return;
    }

    if (!isValidUsername(loginName)) {
      setErrorMessage(
        "Username must only have letters, numbers and underscoress",
      );
      return;
    }

    onLogin(loginName);
  }

  return (
    <div className="login">
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label">
          <span>Username: </span>
          <input
            className="form-input"
            value={loginName}
            onInput={(e) => {
              setLoginName(e.target.value);
              setErrorMessage("");
            }}
          />
        </label>
        <button className="form-button">Login</button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
