import { PAGES, USER_ROLES } from '../constants';

function Controls({ 
  onLogout, 
  onRefresh, 
  onNavigate, 
  role, 
  currentPage 

}) {
  return (
    <div className="controls">
      <button 
        className="btn-secondary" 
        onClick={onRefresh}
      >
        Refresh
      </button>
      
      {role === USER_ROLES.TEACHER && currentPage === PAGES.ASSIGNMENTS && (
        <button 
          className="btn-primary" 
          onClick={() => onNavigate(PAGES.CREATE_ASSIGNMENT)}
        >
          Create Assignment
        </button>
      )}
      
      {currentPage !== PAGES.ASSIGNMENTS && (
        <button 
          className="btn-secondary" 
          onClick={() => onNavigate(PAGES.ASSIGNMENTS)}
        >
          Back to Assignments
        </button>
      )}
      
      <button 
        className="btn-primary" 
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Controls;