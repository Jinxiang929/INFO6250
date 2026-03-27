import { useState } from 'react';
import { SERVER, MESSAGES } from '../constants';
import '../Styles/CreateAssignment.css';

function CreateAssignment({ onCreateAssignment, onCancel }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [allowedAttempts, setAllowedAttempts] = useState(1);
  const [error, setError] = useState('');
  
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
    
    const selectedDate = new Date(dueDate);
    const today = new Date();
    
    setError('');
    onCreateAssignment(title, description, allowedAttempts, dueDate);
  }
  
  return (
    <div className="form-container">
      <h2 className="form-title">Create New Assignment</h2>
      
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
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAssignment;