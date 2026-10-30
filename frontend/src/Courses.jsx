import { useEffect, useState } from 'react';
import { api } from './api';

function CourseCard({ c, onEnroll, onQuiz }) {
  return (
    <div className="card">
      <h3>{c.title}</h3>
      <p>{c.description}</p>
      <small>Instructor: {c.instructor}</small><br />
      <button className="p" onClick={() => onEnroll(c)}>Enroll</button>
      <button className="p" onClick={() => onQuiz(c)}>Take Quiz</button>
    </div>
  );
}

export default function Courses({ user, onQuiz, goLogin }) {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => { api('/api/courses').then(setList).catch((e) => setMsg(e.message)); }, []);

  const enroll = async (c) => {
    if (!user) return goLogin();
    await api(`/api/enroll?userId=${user.id}&courseId=${c.id}`, { method: 'POST' });
    setMsg('Enrolled in ' + c.title);
  };
  const quiz = (c) => (user ? onQuiz(c) : goLogin());

  return (
    <div>
      <h2>Courses</h2>
      <p>{msg}</p>
      <div className="grid">{list.map((c) => <CourseCard key={c.id} c={c} onEnroll={enroll} onQuiz={quiz} />)}</div>
    </div>
  );
}
