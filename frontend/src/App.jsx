import { useState } from 'react';
import Home from './Home';
import Auth from './Auth';
import Courses from './Courses';
import Quiz from './Quiz';
import Dashboard from './Dashboard';

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);

  return (
    <div>
      <nav>
        <b>LearnHub</b>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('courses')}>Courses</button>
        {user && <button onClick={() => setPage('dashboard')}>Dashboard</button>}
        {user ? <button onClick={() => { setUser(null); setPage('home'); }}>Logout</button>
              : <button onClick={() => setPage('login')}>Login</button>}
      </nav>
      <div className="wrap">
        {page === 'home' && <Home />}
        {page === 'login' && <Auth onLogin={(u) => { setUser(u); setPage('courses'); }} />}
        {page === 'courses' && <Courses user={user} goLogin={() => setPage('login')}
          onQuiz={(c) => { setCourse(c); setPage('quiz'); }} />}
        {page === 'quiz' && <Quiz course={course} user={user} back={() => setPage('courses')} />}
        {page === 'dashboard' && user && <Dashboard user={user} />}
      </div>
    </div>
  );
}
