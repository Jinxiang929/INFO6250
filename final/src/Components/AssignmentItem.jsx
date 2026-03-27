import { PAGES, USER_ROLES } from '../constants';
import '../Styles/AssignmentItem.css';

function AssignmentItem({ 
  assignment, 
  role, 
  submissionStatus, 
  onNavigate, 
  onDeleteAssignment,

}) {
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const isPastDue = () => {
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    return today > dueDate;
  };

  const hasSubmitted = role === USER_ROLES.STUDENT && submissionStatus === true;
  
  return (
    <li className="assignment-item">
      <div className="assignment-header">
        <h3 className="assignment-title">{assignment.title}</h3>
        <div className="assignment-date">
          <p>Due: {formatDate(assignment.dueDate)}</p>
        </div>
      </div>
      
      <div className="assignment-description">
        <p>{assignment.description || 'No description provided.'}</p>
      </div>
      
      <div className="assignment-actions">
        {role === USER_ROLES.STUDENT && (
          <>
            <span className={`submission-status ${hasSubmitted ? 'status-submitted' : 'status-pending'}`}>
              {hasSubmitted ? 'Submitted' : 'Not Submitted'}
            </span>
            
            <button 
              className="btn-primary"
              onClick={() => onNavigate(PAGES.SUBMIT_ASSIGNMENT, assignment.id)}
            >
              {hasSubmitted ? 'View Submission' : 'Submit Assignment'}
            </button>
          </>
        )}
        
        {role === USER_ROLES.TEACHER && (
          <>
            <span>
              {submissionStatus} {submissionStatus === 1 ? 'student has' : 'students have'} submitted
            </span>
            
            <button 
              className="btn-secondary"
              onClick={() => onNavigate(PAGES.VIEW_SUBMISSIONS, assignment.id)}
            >
              View Submissions
            </button>
            
            <button 
              className="btn-primary"
              onClick={() => onNavigate(PAGES.EDIT_ASSIGNMENT, assignment.id)}
            >
              Edit
            </button>
            
            <button 
              className="btn-primary"
              onClick={() => onDeleteAssignment(assignment.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default AssignmentItem;