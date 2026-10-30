export const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export async function api(path, opt = {}) {
  const r = await fetch(API + path, {
    method: opt.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opt.body ? JSON.stringify(opt.body) : undefined,
  });
  const t = await r.text();
  if (!r.ok) throw new Error(t || 'Request failed');
  return t ? JSON.parse(t) : null;
}
