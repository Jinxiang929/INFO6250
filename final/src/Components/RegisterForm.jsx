import { useState } from 'react';
import { USER_ROLES, SERVER, MESSAGES } from '../constants';
import '../Styles/RegisterForm.css';

function RegisterForm({ onRegister, onNavigate }) {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState(USER_ROLES.STUDENT);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function onChange(e) {
        setUsername(e.target.value);
        setError('');
        setSuccessMessage('');
    }

    function handleRoleChange(newRole) {
        setRole(newRole);
        setError(''); 
        setSuccessMessage('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setError('');
        setSuccessMessage('');

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
        onRegister(username, role)
            .then(() => {
                setSuccessMessage(MESSAGES[REGISTRATION_SUCCESS]);
                setUsername('');
            })
            .catch(err => {
                if (err?.error === SERVER.USERNAME_EXISTS) {
                    setError(SERVER.USERNAME_EXISTS);
                    setUsername('');
                }
                if (err?.error === CLIENT.NETWORK_ERROR) {
                    setError(CLIENT.NETWORK_ERROR);
                    setUsername('');
                } 

            });
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Register</h2>
            
            {error && (
                <div className="status">{MESSAGES[error] || error}</div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={onChange}
                    />
                </div>
                
                <div className="form-group">
                    <label>Role:</label>
                    <div className="role-selection">
                        <div className="role-option">
                            <input
                                type="radio"
                                id="role-student"
                                name="role"
                                value={USER_ROLES.STUDENT}
                                checked={role === USER_ROLES.STUDENT}
                                onChange={() => handleRoleChange(USER_ROLES.STUDENT)}
                            />
                            <label htmlFor="role-student">Student</label>
                        </div>
                        
                        <div className="role-option">
                            <input
                                type="radio"
                                id="role-teacher"
                                name="role"
                                value={USER_ROLES.TEACHER}
                                checked={role === USER_ROLES.TEACHER}
                                onChange={() => handleRoleChange(USER_ROLES.TEACHER)}
                            />
                            <label htmlFor="role-teacher">Teacher</label>
                        </div>
                    </div>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn-primary">Register</button>
                </div>
                
                <div className="form-footer">
                    <p>Already have an account? 
                        <a onClick={() => {
                            setError('');
                            setUsername('');
                            onNavigate();
                        }}> Login here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;