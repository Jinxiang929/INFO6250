import { useState, useEffect, useCallback } from 'react';

import './App.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  POLLING_DELAY,
  PAGES,
  USER_ROLES,
  REGISTRATION_SUCCESS,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchAssignments,
  fetchCreateAssignment,
  fetchUpdateAssignment,
  fetchDeleteAssignment,
  fetchSubmissions,
  fetchCreateSubmission,
  fetchUpdateSubmission,
  fetchAddComment,
  fetchAssignmentSubmissions,
} from './services';

import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Status from './Components/Status';
import Loading from './Components/Loading';
import Controls from './Components/Controls';
import AssignmentList from './Components/AssignmentList';
import CreateAssignment from './Components/CreateAssignment';
import EditAssignment from './Components/EditAssignment';
import SubmissionForm from './Components/SubmissionForm';
import SubmissionList from './Components/SubmissionList';

function App() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isDataPending, setIsDataPending] = useState(false);
  const [assignments, setAssignments] = useState({});
  const [submissions, setSubmissions] = useState({});
  const [currentPage, setCurrentPage] = useState(PAGES.ASSIGNMENTS);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [sessionValid, setSessionValid] = useState(true);

  const [pollingId, setPollingId] = useState(null);

  useEffect(() => {
    setError('');
  }, [currentPage]);

  function checkSessionStatus() {
    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      fetchSession()
        .then(() => {
          if (!sessionValid) {
            setSessionValid(true);
            if (error === CLIENT.NO_SESSION) {
              setError('');
            }
          }
          if (error === CLIENT.NETWORK_ERROR) {
            setError('');
          }
        })
        .catch(err => {
          if (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION) {
            setSessionValid(false);
            setError(CLIENT.NO_SESSION);
            setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
            setCurrentPage(PAGES.LOGIN);
          } 
          else if (err?.error === CLIENT.NETWORK_ERROR) {
            setError(CLIENT.NETWORK_ERROR);
          }
        });
    }
  }

  function onLogin(username) {
    setError('');
    setIsDataPending(true);
    fetchLogin(username)
      .then(userData => {
        setUsername(userData.username);
        setRole(userData.role);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setSessionValid(true);
        return fetchAssignments();
      })
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {
        setSubmissions(fetchedSubmissions);
        setIsDataPending(false);
        setCurrentPage(PAGES.ASSIGNMENTS);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onRegister(username, role) {
    setError('');
    setIsDataPending(true);
    fetchRegister(username, role)
    .then(() => {
      setIsDataPending(false);
      setError(REGISTRATION_SUCCESS); 

      setTimeout(() => {
        setCurrentPage(PAGES.LOGIN);
      }, 3000);
    })
    .catch(err => {
      setError(err?.error || '');
      setIsDataPending(false);
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setRole('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setAssignments({});
    setSubmissions({});
    setCurrentPage(PAGES.LOGIN);
    setSelectedAssignmentId(null);
    setSelectedSubmissionId(null);
    
    fetchLogout()
      .catch(err => {
        setError(err?.error || '');
      });
  }

  function onRefreshData() {
    setError('');
    setIsDataPending(true);
    
    fetchAssignments()
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {
        setSubmissions(fetchedSubmissions);
        setIsDataPending(false);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onCreateAssignment(title, description, allowedAttempts, dueDate) {
    setError('');
    setIsDataPending(true);
    
    fetchCreateAssignment(title, description, allowedAttempts, dueDate)
      .then(() => {
        return fetchAssignments();
      })
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        setIsDataPending(false);
        setCurrentPage(PAGES.ASSIGNMENTS);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onUpdateAssignment(id, title, description, allowedAttempts, dueDate) {
    setError('');
    setIsDataPending(true);
    
    fetchUpdateAssignment(id, title, description, allowedAttempts, dueDate)
      .then(() => {
        return fetchAssignments();
      })
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        setIsDataPending(false);
        setCurrentPage(PAGES.ASSIGNMENTS);
        setSelectedAssignmentId(null);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onDeleteAssignment(id) {
    setError('');
    setIsDataPending(true);
    
    fetchDeleteAssignment(id)
      .then(() => {
        return fetchAssignments();
      })
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {
        setSubmissions(fetchedSubmissions);
        setIsDataPending(false);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onSubmitAssignment(assignmentId, content) {

    if (error === CLIENT.NETWORK_ERROR) {
      return;
    }
    setError('');
    setIsDataPending(true);
    
    fetchCreateSubmission(assignmentId, content)
      .then(() => {

        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {

        setSubmissions(prev => ({
            ...prev,
            ...fetchedSubmissions
          }));

        setIsDataPending(false);

      })
      .catch(err => {

        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onUpdateSubmission(id, content) {
    setError('');
    setIsDataPending(true);
    
    fetchUpdateSubmission(id, content)
      .then(updatedSubmission => {
        setSubmissions(prev => ({
          ...prev,
          [updatedSubmission.id]: updatedSubmission
        }));
        setIsDataPending(false);

        setTimeout(() => {
          setCurrentPage(PAGES.ASSIGNMENTS);
          setSelectedSubmissionId(null);
        }, 3000);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onAddComment(id, comments) {
    setError('');
    setIsDataPending(true);
    
    fetchAddComment(id, comments)
      .then(() => {
        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {
        setSubmissions(fetchedSubmissions);
        setIsDataPending(false);
      })
      .catch(err => {
        setError(err?.error || '');
        setIsDataPending(false);
      });
  }

  function onNavigate(page, id = null) {

    setError('');
    if (page === PAGES.VIEW_SUBMISSIONS && id) {
      setIsDataPending(true);
      setSelectedAssignmentId(id);

      fetchAssignments()
      .then(fetchedAssignments => {

        setAssignments(prev => ({
          ...prev,
          [id]: fetchedAssignments
        }));
        return fetchAssignmentSubmissions(id);
      })
      .then(fetchedSubmissions => {

        setSubmissions(fetchedSubmissions);
        setIsDataPending(false);
        setCurrentPage(page);
      })
      .catch(err => {

        setError(err?.error || '');
        setIsDataPending(false);
      });
    } 
    else if (page === PAGES.EDIT_ASSIGNMENT || page === PAGES.SUBMIT_ASSIGNMENT) {
      setSelectedAssignmentId(id);
      setCurrentPage(page);
    } 

    else {
      setCurrentPage(page);

    }
  }

  useEffect(() => {
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setRole(session.role);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setSessionValid(true);
        return fetchAssignments();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION) {
          setCurrentPage(PAGES.LOGIN);
          setError(CLIENT.NO_SESSION);
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        if (err?.error === CLIENT.NETWORK_ERROR) {
          setError(CLIENT.NETWORK_ERROR);
          return Promise.reject({ error: CLIENT.NETWORK_ERROR });
        }

        return Promise.reject(err);
      })
      .then(fetchedAssignments => {
        setAssignments(fetchedAssignments);
        return fetchSubmissions();
      })
      .then(fetchedSubmissions => {
        setSubmissions(fetchedSubmissions);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          return;
        }
        if (err?.error === CLIENT.NO_SESSION || err?.error === CLIENT.NETWORK_ERROR) {
            return;
        }
        setError(err?.error || '');
      });
  }, []);

  useEffect(() => {
    if (!sessionValid && loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      const currentError = error;
      onLogout();
      setError(currentError); 
    }
  }, [sessionValid, loginStatus, error]);

  const pollData = useCallback(() => {

    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      checkSessionStatus();
    }
    if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN && sessionValid) {
      fetchAssignments()
        .then(fetchedAssignments => {
          setAssignments(fetchedAssignments);
          return fetchSubmissions();
        })
        .then(fetchedSubmissions => {
          setSubmissions(fetchedSubmissions);
          const id = setTimeout(pollData, POLLING_DELAY);
          setPollingId(id);
        })
        .catch(err => {
          if (err?.error === CLIENT.NETWORK_ERROR) {
            setError(CLIENT.NETWORK_ERROR);
          } 
          else if (err?.error === SERVER.AUTH_MISSING || err?.error === CLIENT.NO_SESSION) {
            setSessionValid(false);
            setError(CLIENT.NO_SESSION);
          } 
          else {
            setError(err?.error || '');
          }
          const id = setTimeout(pollData, POLLING_DELAY);
          setPollingId(id);
        });
    }
  }, [loginStatus, sessionValid, error]);


  useEffect(() => {
    if (pollingId) {
      clearTimeout(pollingId);
      setPollingId(null);
    }
    
    const id = setTimeout(pollData, POLLING_DELAY);
    setPollingId(id);

    return () => {
      if (pollingId) {
        clearTimeout(pollingId);
      }
    };
  }, [loginStatus, pollData]);

  const shouldShowError = () => {
    if (loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) {
      return currentPage === PAGES.LOGIN || currentPage === PAGES.REGISTER;
    }
    return true;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Classwork Tracker</h1>
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="user-info">
            <p>Welcome, {username} ({role})</p>
            <Controls 
              onLogout={onLogout} 
              onRefresh={onRefreshData}
              onNavigate={onNavigate}
              role={role}
              currentPage={currentPage}
            />
          </div>
        )}
      </header>
      
      <main className="app-content">
        {error && shouldShowError() && <Status error={error} />}
        
        {loginStatus === LOGIN_STATUS.PENDING && (
          <Loading className="loading">Loading user data...</Loading>
        )}
        
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && currentPage === PAGES.LOGIN && (
          <LoginForm 
            onLogin={onLogin} 
            onNavigate={() => {
              setError('');
              setCurrentPage(PAGES.REGISTER);
            }} 
          />
        )}
        
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && currentPage === PAGES.REGISTER && (
          <RegisterForm 
            onRegister={onRegister} 
            onNavigate={() => {
              setError('');
              setCurrentPage(PAGES.LOGIN);
            }} 
          />
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && isDataPending && (
          <Loading className="loading">Loading data...</Loading>
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isDataPending && currentPage === PAGES.ASSIGNMENTS && (
          <AssignmentList 
            assignments={assignments}
            submissions={submissions}
            role={role}
            onNavigate={onNavigate}
            onDeleteAssignment={onDeleteAssignment}
          />
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isDataPending && currentPage === PAGES.CREATE_ASSIGNMENT && role === USER_ROLES.TEACHER && (
          <CreateAssignment 
            onCreateAssignment={onCreateAssignment}
            onCancel={() => onNavigate(PAGES.ASSIGNMENTS)}
          />
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isDataPending && currentPage === PAGES.EDIT_ASSIGNMENT && role === USER_ROLES.TEACHER && (
          <EditAssignment 
            assignment={assignments[selectedAssignmentId]}
            onUpdateAssignment={onUpdateAssignment}
            onCancel={() => onNavigate(PAGES.ASSIGNMENTS)}
          />
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isDataPending && currentPage === PAGES.SUBMIT_ASSIGNMENT && role === USER_ROLES.STUDENT && (
          <SubmissionForm 
            assignment={assignments[selectedAssignmentId]}
            onSubmitAssignment={onSubmitAssignment}
            onUpdateSubmission={onUpdateSubmission}
            onCancel={() => onNavigate(PAGES.ASSIGNMENTS)}
          />
        )}
        
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isDataPending && currentPage === PAGES.VIEW_SUBMISSIONS && role === USER_ROLES.TEACHER && (
          <SubmissionList 
            assignment={assignments[selectedAssignmentId]}
            submissions={Object.values(submissions)}
            onAddComment={onAddComment}
            onCancel={() => onNavigate(PAGES.ASSIGNMENTS)}
          />
        )}

        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && isDataPending && (
          <Loading className="loading">
            {currentPage === PAGES.VIEW_SUBMISSIONS ? 'Loading submissions...' : 'Loading data...'}
          </Loading>
        )}
      </main>
    </div>
  );
}

export default App;