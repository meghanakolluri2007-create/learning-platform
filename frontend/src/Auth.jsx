import { useState } from 'react';
import { api } from './api';

export default function Auth({ onLogin }) {
  const [reg, setReg] = useState(false);
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async () => {
    try {
      setErr('');
      if (reg) await api('/api/register', { method: 'POST', body: f });
      const u = await api('/api/login', { method: 'POST', body: { email: f.email, password: f.password } });
      onLogin(u);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div className="card">
      <h2>{reg ? 'Register' : 'Login'}</h2>
      {reg && <input placeholder="Name" value={f.name} onChange={set('name')} />}
      <input placeholder="Email" value={f.email} onChange={set('email')} />
      <input type="password" placeholder="Password" value={f.password} onChange={set('password')} />
      <button className="p" onClick={submit}>{reg ? 'Register' : 'Login'}</button>
      <button className="p" onClick={() => setReg(!reg)}>{reg ? 'Have an account?' : 'New user?'}</button>
      <p className="err">{err}</p>
    </div>
  );
}
