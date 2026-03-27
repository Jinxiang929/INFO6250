import sessions from '../models/sessions.js';
import users from '../models/users.js';
import assignments from '../models/assignments.js';
import submissions from '../models/submissions.js';

const globalSubmissionList = submissions.handleSubmission();
const globalAssignmentList = assignments.handleAssignment();

function getSubmissions(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const role = users.getUserRole(username);
    
    if(role === 'teacher') {
      res.json(globalSubmissionList.getAllSubmissions());
    } 
    else {
      res.json(globalSubmissionList.getSubmissionsByStudent(username));
    }
}

function createSubmission(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const role = users.getUserRole(username);
    if(role !== 'student') {
      res.status(403).json({ error: 'not-authorized' });
      return;
    }
    
    const { assignmentId, content } = req.body;
    if(!assignmentId || !content) {
      res.status(400).json({ error: 'required-fields' });
      return;
    }

    if(!globalAssignmentList.contains(assignmentId)) {
      res.status(404).json({ error: 'assignment-not-found' });
      return;
    }

    const assignment = globalAssignmentList.getAssignment(assignmentId);
    const submissionCount = globalSubmissionList.getSubmissionCountByStudentAndAssignment(username, assignmentId);
    
    if (submissionCount >= assignment.allowedAttempts) {
        res.status(403).json({ error: 'max-attempts-reached' });
        return;
    }    

    const isDue = new Date() > new Date(assignment.dueDate);
    const id = globalSubmissionList.addSubmission(username, assignmentId, content);

    if (isDue) {
      globalSubmissionList.updateSubmission(id, { isLate: true });
    }

    res.json(globalSubmissionList.getSubmission(id));
}

function getSubmission(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const { id } = req.params;
    if(!globalSubmissionList.contains(id)) {
      res.status(404).json({ error: 'no-submission' });
      return;
    }

    const submission = globalSubmissionList.getSubmission(id);
    const role = users.getUserRole(username);

    if(role === 'student' && submission.student !== username) {
        res.status(403).json({ error: 'not-authorized' });
        return;
    }
    
    res.json(submission);
}

function getSubmissionsByAssignment(req, res) {
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
  
  const { assignmentId } = req.params;
  if(!globalAssignmentList.contains(assignmentId)) {
      res.status(404).json({ error: 'assignment-not-found' });
      return;
  }
  
  const assignmentSubmissions = globalSubmissionList.getSubmissionsByAssignment(assignmentId);
  res.json(assignmentSubmissions);
}

function getStudentSubmissions(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
  }
  
  const { assignmentId } = req.params;
  if(!globalAssignmentList.contains(assignmentId)) {
      res.status(404).json({ error: 'assignment-not-found' });
      return;
  }
  
  const role = users.getUserRole(username);
  
  if(role === 'student') {
      const submissions = globalSubmissionList.getAllSubmissionsByStudentAndAssignment(username, assignmentId);
      res.json(submissions);
  } 
  else {
      const assignmentSubmissions = globalSubmissionList.getSubmissionsByAssignment(assignmentId);
      res.json(assignmentSubmissions);
  }
}

function updateSubmission(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const { id } = req.params;
    if(!globalSubmissionList.contains(id)) {
      res.status(404).json({ error: 'no-submission' });
      return;
    }
    
    const role = users.getUserRole(username);
    
    if(role === 'student') {
      res.status(403).json({ error: 'not-authorized' });
      return;
    }

    else if(role === 'teacher') {
      const { comments } = req.body;
      if (comments !== undefined) {
        globalSubmissionList.updateSubmission(id, { comments });
        res.json(globalSubmissionList.getSubmission(id));
      } 
      else {
        res.status(400).json({ error: 'no-changes' });
      }
    }
}

export default {
    getSubmissions,
    createSubmission,
    getSubmission,
    updateSubmission,
    getSubmissionsByAssignment,
    getStudentSubmissions
};