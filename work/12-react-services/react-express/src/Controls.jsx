function Controls({ onLogout, onRefresh }) {
    return (
      <div className="controls">
        <button onClick={onRefresh} className="controls-refresh">Refresh</button>
        <button onClick={onLogout} className="controls-logout">Logout</button>
      </div>
    );
  }
  
  export default Controls;