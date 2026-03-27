import { useState  } from 'react';
import { CLIENT, SERVER, MESSAGES } from '../constants';
import '../Styles/LoginForm.css';

function LoginForm({ onLogin, onNavigate }) {
    
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
        setError('');
    }

    function onSubmit(e) {
        e.preventDefault();

        setError('');

        if (!username.trim() ) {
            setError(SERVER.REQUIRED_USERNAME);
            setUsername('');
            return;
        }

        if (!username.match(/^[A-Za-z0-9_]+$/)) {
            setError(SERVER.REQUIRED_USERNAME);
            setUsername('');
            return;
        }

        if (username === 'dog') {
            setError(SERVER.AUTH_INSUFFICIENT);
            setUsername('');
            return;
        }

        setError('');
        onLogin(username)
            .catch(err => {
                if (err?.error === CLIENT.NETWORK_ERROR) {
                    setError(CLIENT.NETWORK_ERROR);
                    setUsername('');
                } 
            });
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>

            {error && (
                <div className="status">{MESSAGES[error] || error}</div>
            )}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={onChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">Login</button>
                </div>

                <div className="form-fotter">
                    <p>Don't have an account? 
                        <a onClick={() => {
                            setError(''); 
                            setUsername('');
                            onNavigate();
                        }}> Register here
                        </a>
                    </p>   
                </div>
            </form>
        </div>
    );
}

export default LoginForm;