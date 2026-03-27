import { useState, useEffect } from 'react';
import { SERVER, MESSAGES } from '../constants';
import '../Styles/SubmissionForm.css';

import {
  fetchGetStudentSubmissions
} from '../services';

function SubmissionForm({ 
  assignment, 
  existingSubmission, 
  onSubmitAssignment, 
  onUpdateSubmission, 
  onCancel,

}) {
  
  const [content, setContent] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [previousSubmissions, setPreviousSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (assignment) {

      setIsLoading(true);
      fetchGetStudentSubmissions(assignment.id)
        .then(submissions => {

          if (Array.isArray(submissions)) {
            submissions.sort((a, b) => a.attemptNumber - b.attemptNumber);
            setPreviousSubmissions(submissions);
            setSubmissionCount(submissions.length);
          } 
          else {
            setPreviousSubmissions([]);
            setSubmissionCount(0);
          }
          setIsLoading(false);
        })
        .catch(err => {
          
          setError(err?.error || '');
          setPreviousSubmissions([]);
          setSubmissionCount(0);
          setIsLoading(false);
        });
    }
  }, [assignment]);

  function onChange(e) {
    setContent(e.target.value);

    if (error === SERVER.REQUIRED_CONTENT) {
      setError('');
    }
  }
  
  useEffect(() => {

    if (existingSubmission) {
      setContent(existingSubmission.content || '');
      setComments(existingSubmission.comments || '');
      setIsEditMode(true);
    }
    else {
      setIsEditMode(false);
    }
  }, [existingSubmission]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isPastDue = () => {
    if (!assignment?.dueDate) return false;
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    return today > dueDate;
  };

  const canSubmit = () => {
    return submissionCount < assignment.allowedAttempts;
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (!content.trim()) {
      setError(SERVER.REQUIRED_CONTENT);
      return;
    }

    if (!assignment) {
      setError(SERVER.ASSIGNMENT_NOT_FOUND);
      return;
    }
    
    if(!canSubmit()) {
      setError(SERVER.MAX_ATTEMPTS_REACHED);
      return;
    }

    setError('');

    if (isEditMode && existingSubmission) {
      onUpdateSubmission(existingSubmission.id, content);
    } else {
      onSubmitAssignment(assignment.id, content);
    }
  }
  
  if (!assignment) {
    return <div>Loading assignment...</div>;
  }
  
  return (
    <div className="form-container">
      <h2 className="form-title">
        Submit Assignment
      </h2>
      
      <div className="assignment-info">
        <h3>{assignment.title}</h3>

        <p className="assignment-date">Due: {formatDate(assignment.dueDate)}</p>

        <p>{assignment.description}</p>

        <div className="assignment-attempts">
          <p>You have used {submissionCount} of {assignment.allowedAttempts} allowed attempts.</p>
          <p className="attempt-note">Note: Once submitted, you cannot edit your submission.</p>
        </div>
      </div>

      {isPastDue() && !isEditMode && (
        <div className="status">
          Warning: This assignment is past due. Your submission will be marked as late.
        </div>
      )}
      
      {error && (
        <div className="status">{MESSAGES[error] || error}</div>
      )}

      {previousSubmissions.length > 0 && (
        <div className="previous-submissions">
          <h4>Your Previous Submissions</h4>
          <div className="submission-history">
            {previousSubmissions.map((submission) => (
              <div key={submission.id} className="previous-submission">
                <div className="submission-header">
                  <h5>Attempt {submission.attemptNumber}</h5>
                  <p className="submission-date">
                    Submitted: {formatDate(submission.submittedAt)}
                    {submission.isLate && <span className="late-badge"> (Late)</span>}
                  </p>
                </div>
                <div className="submission-content">
                  {submission.content}
                </div>
                {submission.comments && (
                  <div className="comment-section">
                    <h6 className="comment-header">Instructor Comments:</h6>
                    <div className="comment-content">
                      {submission.comments}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {canSubmit() ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Your Submission (Attempt {submissionCount + 1}):</label>
            <textarea
              id="content"
              value={content}
              onChange={onChange}
              placeholder="Enter your assignment here..."
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Assignment
            </button>
          </div>
        </form>
      ) : (
        <div className="max-attempts-reached">
          <p>You have reached the maximum allowed attempts for this assignment.</p>
        </div>
      )}
    </div>
  );
}


export default SubmissionForm;