import { useEffect, useState } from 'react';
import { api } from './api';

export default function Dashboard({ user }) {
  const [rows, setRows] = useState([]);
  useEffect(() => { api('/api/dashboard?userId=' + user.id).then(setRows); }, [user]);
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>My Learning Progress</h3>
      {rows.length === 0 && <p>No enrolled courses yet.</p>}
      {rows.map((r) => (
        <div className="card" key={r.courseId} style={{ marginBottom: 10 }}>
          <b>{r.title}</b> - {r.progress}%
          <div className="bar"><div style={{ width: r.progress + '%' }} /></div>
        </div>
      ))}
    </div>
  );
}
