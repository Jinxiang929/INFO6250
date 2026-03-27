# Classwork Tracker

A web application for managing assignments and submissions between teachers and students with a focus on simplicity and usability.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Features and Usage](#features-and-usage)
  - [Authentication](#authentication)
  - [Teacher Features and Workflow](#teacher-features-and-workflow)
  - [Student Features and Workflow](#student-features-and-workflow)
  - [General Features](#general-features)
- [Application Structure](#application-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Notes](#notes)
- [Implemented Bonus Requirements](#implemented-bonus-requirements)

## Overview

Classwork Tracker is a single page application that facilitates the management of classroom assignments. It allows teachers to create, edit, and delete assignments, while students can view and submit assignments. The application supports multiple submission attempts, includes due date tracking, submission history, and teacher comment functionality.

## Installation

The application can be tested by following these steps:

1. Run `npm install` to install dependencies
2. Choose one of these options:
   
   **Development Mode:**
   - Run `npm start` to start the services server on port 3000 (Note: this requires changing the scripts section of package.json)
   - Run `npm run dev` (in a separate terminal) to start the Vite dev server on port 5173
   - Visit http://localhost:5173 in the browser

   **Production Mode:**
   - Run `npm run build` to create the static files in dist/
   - Run `npm start` to start the express server (without running the Vite dev server)
   - Visit http://localhost:3000 in the browser

## Features and Usage

### Authentication
- User registration with role selection (Teacher/Student)
   - Users who are already registered cannot register again using the same username, regardless of role.
   - To avoid conflict, usernames must be unique across the entire system. For example, if a user registers with the username “Jorts” as a Student, the same username cannot be used to register as a Teacher.
- User login/logout
   - A user cannot login without registration
   - Only first time need to register, the username can login directly next time
- Session persistence
   - A user that is already logged in will not have to log in again
- Role-based access control
- Username "dog" will be treated as a denied user for both login page and register page
- Usernames allow only numbers, characters, and underscores; others treated as invalid for both login and register pages
- Session-based authentication system:
  - Users register with a valid username and role (teacher/student)
  - Login creates a server-side session
  - Authorization is role-based with different views and permissions
  - Session is verified on initial load and maintained through polling

### Teacher Features and Workflow
1. **Create assignments** with title, description, due date, and allowed submission attempts
   - Required fields not filled will show error message
2. **Edit existing assignments** by clicking the Edit button
3. **Delete assignments** as needed
4. **View all student submissions** for each assignment by clicking "View Submissions"
5. **Add comments to student submissions**
   - Cannot add empty comments

### Student Features and Workflow
1. **View all available assignments** after logging in
2. **Submit assignments** before deadlines
   - Once submitted, cannot edit the submission
   - Past due date submissions are still accepted but will show a warning message that late submissions may not count for marks
   - Late submissions will show a "Late" label visible to both students and teachers
   - Cannot submit empty assignments
3. **Track submission status** (submitted/not submitted)
4. **View submission history** with timestamps
5. **See teacher comments** on submissions
6. **Submit multiple attempts** if allowed by the teacher (based on teacher-defined attempt limit)

### General Features
- Responsive design for various screen sizes
- Real-time updates through polling
- Error handling and validation
- Late submission detection

## Application Structure

### Frontend

The frontend follows a component-based architecture using React:

```
src/
├── App.jsx                # Main application component
├── App.css                # Global styles and layout
├── constants.js           # Application constants and messages
├── services.js            # API service functions
├── index.css              # Root styles
├── main.jsx               # Application entry point
│
├── Components/            # React components
│   ├── LoginForm.jsx      # User login component
│   ├── RegisterForm.jsx   # User registration component
│   ├── Status.jsx         # Error/status message component
│   ├── Loading.jsx        # Loading indicator component
│   ├── Controls.jsx       # Navigation/action buttons component
│   ├── AssignmentList.jsx # List of assignments component
│   ├── AssignmentItem.jsx # Individual assignment component
│   ├── CreateAssignment.jsx # Assignment creation form
│   ├── EditAssignment.jsx   # Assignment editing form
│   ├── SubmissionForm.jsx   # Assignment submission form
│   └── SubmissionList.jsx   # List of submissions component
│
├── Styles/                # CSS styles for components
│   ├── LoginForm.css      # Login form styles
│   ├── RegisterForm.css   # Registration form styles
│   ├── AssignmentList.css # Assignment list styles
│   ├── AssignmentItem.css # Assignment item styles
│   ├── CreateAssignment.css # Assignment creation styles
│   ├── EditAssignment.css   # Assignment editing styles
│   ├── SubmissionForm.css   # Submission form styles
│   └── SubmissionList.css   # Submission list styles
```

### Backend

The backend is built with Node.js and Express:

```
backend/
├── server.js              # Main Express server setup
│
├── controllers/
│   ├── auth-controller.js      # Authentication controller
│   ├── assignment-controller.js # Assignment controller
│   ├── submission-controller.js # Submission controller
│
├── models/
    ├── assignments.js     # Assignment data model
    ├── sessions.js        # Session management
    ├── submissions.js     # Submission data model
    └── users.js           # User data model
```

## API Endpoints

The application communicates with a backend server through the following API endpoints:

### Authentication
- `POST /api/v1/session` - Login user
- `DELETE /api/v1/session` - Logout user
- `GET /api/v1/session` - Check session status
- `POST /api/v1/users` - Register new user

### Assignments
- `GET /api/v1/assignments` - Get all assignments
- `GET /api/v1/assignments/:id` - Get specific assignment
- `POST /api/v1/assignments` - Create new assignment
- `PATCH /api/v1/assignments/:id` - Update assignment
- `DELETE /api/v1/assignments/:id` - Delete assignment
- `GET /api/v1/assignments/:id/submissions` - Get all submissions for an assignment

### Submissions
- `GET /api/v1/submissions` - Get all submissions for current user
- `GET /api/v1/submissions/:id` - Get specific submission
- `POST /api/v1/submissions` - Create new submission
- `PATCH /api/v1/submissions/:id` - Update submission or add comments
- `GET /api/v1/student/assignments/:id/submissions` - Get a student's submissions for an assignment

## Data Models

### User
- `username`: String (unique identifier)
- `role`: String (teacher or student)

### Assignment
- `id`: String (unique identifier)
- `title`: String
- `description`: String
- `dueDate`: Date
- `allowedAttempts`: Number
- `createdAt`: Date

### Submission
- `id`: String (unique identifier)
- `assignmentId`: String (reference to Assignment)
- `student`: String (username of student)
- `content`: String (submission content)
- `comments`: String (teacher feedback)
- `submittedAt`: Date
- `isLate`: Boolean
- `attemptNumber`: Number

## Notes

In `CreateAssignment.jsx`, the due date validation check was intentionally removed to allow for testing late submission functionality:

```javascript
// Removed code from CreateAssignment.jsx:
// This check would prevent setting due dates in the past
// But was removed to allow testing late submission functionality

// if (selectedDate < today) {
//   setError('Due date cannot be in the past');
//   return;
// }
```

## Implemented Bonus Requirements

- Additional HTTP methods (used in an appropriate RESTful way) beyond the minimum required 3
- Polling when appropriate to the application
- Services with (used) pagination
- Services with filtered data per query param(s) or data send in body

- Different levels of authorization
- Different "pages" and screens that are managed through state
- Complex form validation with visual feedback to the user
- Excellent architecture and separation of concerns on both front end and backend
