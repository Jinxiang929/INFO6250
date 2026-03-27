import sessions from '../models/sessions.js';
import users from '../models/users.js';

function getSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username, role: users.getUserRole(username) });
}

function createSession(req, res) {
    const { username } = req.body;

    if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'invalid-username' });
        return;
    }

    if(!users.isPermitted(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const existingUserData = users.getUserData(username);

    if(!existingUserData) {
        res.status(401).json({ error: 'user-not-found' });
        return;
    }

    const sid = sessions.addSession(username);
    res.cookie('sid', sid);
    res.json({ 
        username, 
        role: users.getUserRole(username) 
    });
}

function deleteSession(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
}

function createUser(req, res) {
    const { username, role } = req.body;

    if(!users.isValidUsername(username)) {
        res.status(400).json({ error: 'invalid-username' });
        return;
    }

    if(!users.isPermitted(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    if(users.usernameExists(username)) {
        res.status(409).json({ error: 'username-exists' });
        return;
    }

    if(role !== 'teacher' && role !== 'student') {
        res.status(400).json({ error: 'invalid-role' });
        return;
    }

    const userData = { role };

    users.addUserData(username, userData);
    
    const sid = sessions.addSession(username);
    res.cookie('sid', sid);
    res.json({ username, role });
}

export default {
    getSession,
    createSession,
    deleteSession,
    createUser
};