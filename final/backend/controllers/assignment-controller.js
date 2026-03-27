import sessions from '../models/sessions.js';
import users from '../models/users.js';
import submissions from '../models/submissions.js';
import assignments from '../models/assignments.js';

const globalAssignmentList = assignments.handleAssignment();

function getAllAssignments(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    
    res.json(globalAssignmentList.getAllAssignments());
}

function createAssignment(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const role = users.getUserRole(username);
    if(role !== 'teacher') {
        res.status(403).json({ error: 'not-authorized' });
        return;
    }

    const { title, description, allowedAttempts, dueDate } = req.body;
    if(!title || !dueDate) {
        res.status(400).json({ error: 'required-fields' });
        return;
    }

    const attemptCount = allowedAttempts ? parseInt(allowedAttempts, 10) : 1;
    if (isNaN(attemptCount) || attemptCount < 1) {
        res.status(400).json({ error: 'invalid-attempts' });
        return;
    }

    const id = globalAssignmentList.addAssignment(title, description, dueDate, attemptCount);
    res.json(globalAssignmentList.getAssignment(id));
}

function getAssignment(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const userData = users.getUserData(username);
    const { id } = req.params;
    if(!userData.contains(id)) {
        res.status(404).json({ error: 'assignment-not-found' });
        return;
    }

    const assignment = globalAssignmentList.getAssignment(id);
    res.json(assignment);
}

function updateAssignment(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const role = users.getUserRole(username);
    if(role !== 'teacher') {
        res.status(403).json({ error: 'not-authorized' });
        return;
    }

    const { id } = req.params;
    const { title, description, allowedAttempts, dueDate } = req.body;

    if(!globalAssignmentList.contains(id)) {
        res.status(404).json({ error: 'assignment-not-found' });
        return;
    }

    let attemptCount = undefined;
    if (allowedAttempts !== undefined) {
        attemptCount = parseInt(allowedAttempts, 10);
        if (isNaN(attemptCount) || attemptCount < 1) {
            res.status(400).json({ error: 'invalid-attempts' });
            return;
        }
    }

    globalAssignmentList.updateAssignment(id, { 
        title, 
        description, 
        allowedAttempts: attemptCount,
        dueDate,
    });

    res.json(globalAssignmentList.getAssignment(id));
}

function deleteAssignment(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const role = users.getUserRole(username);
    if(role !== 'teacher') {
      res.status(403).json({ error: 'not-authorized' });
      return;
    }

    const { id } = req.params;
    if(!globalAssignmentList.contains(id)) {
        res.status(404).json({ error: 'assignment-not-found' });
        return;
    }

    globalAssignmentList.deleteAssignment(id);
    
    const submissionList = submissions.handleSubmission();
    submissionList.deleteSubmissionsForAssignment(id);
    
    res.json({ message: `Assignment ${id} deleted`});
}

export default {
    getAllAssignments,
    createAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment
};