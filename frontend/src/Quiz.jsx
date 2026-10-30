import { useEffect, useState } from 'react';
import { api } from './api';

export default function Quiz({ course, user, back }) {
  const [qs, setQs] = useState([]);
  const [ans, setAns] = useState({});
  const [res, setRes] = useState(null);
  useEffect(() => { api('/api/quiz/' + course.id).then(setQs); }, [course]);

  const submit = async () => {
    const body = { userId: user.id, answers: qs.map((q) => (ans[q.id] === undefined ? -1 : ans[q.id])) };
    setRes(await api(`/api/quiz/${course.id}/submit`, { method: 'POST', body }));
  };

  return (
    <div className="card">
      <h2>Quiz: {course.title}</h2>
      {qs.map((q, i) => (
        <div key={q.id}>
          <p><b>{i + 1}. {q.text}</b></p>
          {q.options.split('|').map((o, idx) => (
            <label key={idx} style={{ display: 'block' }}>
              <input type="radio" style={{ display: 'inline', width: 'auto' }} name={'q' + q.id}
                onChange={() => setAns({ ...ans, [q.id]: idx })} /> {o}
            </label>
          ))}
        </div>
      ))}
      <button className="p" onClick={submit}>Submit</button>
      <button className="p" onClick={back}>Back</button>
      {res && <h3>Score: {res.score} / {res.total}</h3>}
    </div>
  );
}
