import { USER_ROLES } from '../constants';
import AssignmentItem from './AssignmentItem';
import '../Styles/AssignmentList.css';

function AssignmentList({ 
  assignments, 
  submissions, 
  role, 
  onNavigate, 
  onDeleteAssignment 

}) {

  const assignmentArray = Object.values(assignments);
  assignmentArray.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  const hasSubmitted = (assignmentId) => {
    if (role === USER_ROLES.STUDENT) {
      return Object.values(submissions).some(
        submission => submission.assignmentId === assignmentId
      );
    } 
    return false;
  };
  
  const getSubmissionCount = (assignmentId) => {

    const assignmentSubmissions = Object.values(submissions).filter(
      submission => submission.assignmentId === assignmentId
    );
    
    const uniqueStudents = new Set();
    assignmentSubmissions.forEach(submission => {
      if (submission.student) {
        uniqueStudents.add(submission.student);
      }
    });
    
    return uniqueStudents.size;
  };

  return (
    <div>
      <h2>Assignments</h2>
      
      {assignmentArray.length === 0 ? (
        <p>No assignment yet.</p>
      ) : (
        <ul className="assignment-list">
          {assignmentArray.map(assignment => (
            <AssignmentItem 
              key={assignment.id}
              assignment={assignment}
              role={role}
              submissionStatus={
                role === USER_ROLES.STUDENT 
                  ? hasSubmitted(assignment.id) 
                  : getSubmissionCount(assignment.id)
              }
              onNavigate={onNavigate}
              onDeleteAssignment={onDeleteAssignment}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignmentList;