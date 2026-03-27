import express from 'express';
import cookieParser from 'cookie-parser';

import authController from './backend/controllers/auth-controller.js';
import assignmentController from './backend/controllers/assignment-controller.js';
import submissionController from './backend/controllers/submission-controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', authController.getSession);
app.post('/api/v1/session', authController.createSession);
app.delete('/api/v1/session', authController.deleteSession);
app.post('/api/v1/users', authController.createUser);

app.get('/api/v1/assignments', assignmentController.getAllAssignments);
app.post('/api/v1/assignments', assignmentController.createAssignment);
app.get('/api/v1/assignments/:id', assignmentController.getAssignment);
app.patch('/api/v1/assignments/:id', assignmentController.updateAssignment);
app.delete('/api/v1/assignments/:id', assignmentController.deleteAssignment);

app.get('/api/v1/submissions', submissionController.getSubmissions);
app.post('/api/v1/submissions', submissionController.createSubmission);
app.get('/api/v1/submissions/:id', submissionController.getSubmission);
app.patch('/api/v1/submissions/:id', submissionController.updateSubmission);

app.get('/api/v1/assignments/:assignmentId/submissions', submissionController.getSubmissionsByAssignment);
app.get('/api/v1/student/assignments/:assignmentId/submissions', submissionController.getStudentSubmissions);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));