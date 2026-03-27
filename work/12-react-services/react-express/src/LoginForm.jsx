import { useState } from 'react';
import { MESSAGES, SERVER } from './constants';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
        setErrorMessage('');
    }

    function onSubmit(e) {
        e.preventDefault();

        if(!username.trim()) {
            setErrorMessage( MESSAGES[SERVER.REQUIRED_USERNAME] );
            setUsername('');
            return;
        }

        if (username.toLowerCase() === "dog") {
            setErrorMessage( MESSAGES[SERVER.AUTH_INSUFFICIENT] );
            setUsername('');
            return;
        }

        if (!username.match(/^[A-Za-z0-9_]+$/)) {
            setErrorMessage( MESSAGES[SERVER.REQUIRED_USERNAME] );
            setUsername('');
            return;
        }

        onLogin(username);
    }

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form className="login-form" action="#/login" onSubmit={onSubmit}>
                <label className="form-label">
                    <span>Username: </span>
                    <input 
                        className="form-input"
                        value={username}
                        onChange={onChange}
                    />
                </label>
                <button className="form-button">Login</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default LoginForm