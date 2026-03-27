import { useState, useEffect } from 'react';
import { SERVER, MESSAGES } from '../constants';
import '../Styles/SubmissionList.css';

function SubmissionList({ 
  assignment, 
  submissions, 
  onAddComment, 
  onCancel 

}) {

  const [comments, setComments] = useState({});
  const [errors, setErrors] = useState({});
  const [groupedSubmissions, setGroupedSubmissions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(true);

    if (assignment && submissions && submissions.length > 0) {
      
      const assignmentSubmissions = submissions.filter(
        submission => submission.assignmentId === assignment.id
      );

      if (assignmentSubmissions.length > 0) {
        const grouped = {};
        
        assignmentSubmissions.forEach(submission => {
          if (!grouped[submission.student]) {
            grouped[submission.student] = [];
          }
          grouped[submission.student].push(submission);
          
          if (submission.comments) {
            setComments(prev => ({
              ...prev,
              [submission.id]: submission.comments
            }));
          }
        });
        
        Object.keys(grouped).forEach(student => {
          grouped[student].sort((a, b) => a.attemptNumber - b.attemptNumber);
        });
        
        setGroupedSubmissions(grouped);
      } else {
        setGroupedSubmissions({});
      }
    } else {
      setGroupedSubmissions({});
    }
    
    setIsLoading(false);
  }, [assignment, submissions]);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  
  function handleCommentChange(submissionId, value) {
    setComments({
      ...comments,
      [submissionId]: value
    });
  }

  function handleCommentSubmit(submissionId) {
    const comment = comments[submissionId];
    
    if (!comment || !comment.trim()) {
      setErrors({
        ...errors,
        [submissionId]: SERVER.REQUIRED_CONTENT
      });
      return;
    }
    
    setErrors({
      ...errors,
      [submissionId]: ''
    });
    
    onAddComment(submissionId, comment);
  }
  
  if (!assignment) {
    return <div className="loading">Loading assignment data...</div>;
  }
  
  return (
    <div className="submission-container">
      <div className="assignment-header">
        <h2>{assignment.title} - Submissions</h2>
      </div>
      
      <div className="assignment-info">
        <p><span>Due Date:</span> {formatDate(assignment.dueDate)}</p>
        <p><span>Description:</span> {assignment.description || 'No description provided.'}</p>
        <p><span>Allowed Attempts:</span> {assignment.allowedAttempts}</p>
      </div>
      
      {Object.keys(groupedSubmissions).length === 0 ? (
        <p>No submission yet.</p>
      ) : (
        <div className="student-submissions">
          {Object.keys(groupedSubmissions).map(student => (
            <div key={student} className="student-submission-group">
              <h3 className="student-name">{student}</h3>
              
              <div className="submission-attempts">
                {groupedSubmissions[student].map(submission => (
                  <div key={submission.id} className="submission-item">
                    <div className="submission-header">
                      <h4>Attempt {submission.attemptNumber} of {assignment.allowedAttempts}</h4>
                      <p className="submission-date">
                        Submitted: {formatDate(submission.submittedAt)}
                        {submission.isLate && <span className="late-badge"> (Late)</span>}
                      </p>
                    </div>
              
                    <div className="submission-content">
                      {submission.content}
                    </div>
              
                    {submission.comments ? (
                      <div className="comment-section">
                        <h4 className="comment-header">Your Comment:</h4>
                        <div className="comment-content">
                          {submission.comments}
                        </div>
                        <p className="comment-date">
                          Provided on: {formatDate(submission.commentedAt)}
                        </p>
                      </div>
                    ) : (
                      <div className="comment-form">
                        <h4>Add Comment:</h4>
                        
                        {errors[submission.id] && (
                          <div className="status">{MESSAGES[errors[submission.id]] || errors[submission.id]}</div>
                        )}
                  
                        <div className="form-group">
                          <textarea
                            value={comments[submission.id] || ''}
                            onChange={(e) => handleCommentChange(submission.id, e.target.value)}
                            placeholder="Enter comment for student..."
                          />
                        </div>
                        
                        <button 
                          className="btn-primary"
                          onClick={() => handleCommentSubmit(submission.id)}
                        >
                          Submit Comment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SubmissionList;