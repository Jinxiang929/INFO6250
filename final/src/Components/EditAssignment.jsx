import { useState, useEffect } from 'react';
import { SERVER, MESSAGES } from '../constants';
import '../Styles/EditAssignment.css';

function EditAssignment({ assignment, onUpdateAssignment, onCancel }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [allowedAttempts, setAllowedAttempts] = useState(1);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || '');
      setDescription(assignment.description || '');
      setAllowedAttempts(assignment.allowedAttempts || 1);
    
      if (assignment.dueDate) {
        const date = new Date(assignment.dueDate);
        const formattedDate = date.toISOString().split('T')[0];
        setDueDate(formattedDate);
      } 
      else {
        setDueDate('');
      }
    }
  }, [assignment]);
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (!title.trim()) {
      setError(SERVER.REQUIRED_FIELDS);
      return;
    }
    
    if (!dueDate) {
      setError(SERVER.REQUIRED_FIELDS);
      return;
    }
    
    if (allowedAttempts < 1) {
      setError(SERVER.INVALID_ATTEMPTS);
      return;
    }
    
    setError('');

    onUpdateAssignment(assignment.id, title, description, allowedAttempts, dueDate);
  }
  
  if (!assignment) {
    return <div>Loading assignment...</div>;
  }
  
  return (
    <div className="form-container">
      <h2 className="form-title">Edit Assignment</h2>
      
      {error && (
        <div className="status">{MESSAGES[error] || error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="allowedAttempts">Allowed Attempts:</label>
          <input
            type="number"
            id="allowedAttempts"
            min="1"
            value={allowedAttempts}
            onChange={(e) => setAllowedAttempts(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update Assignment
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAssignment;