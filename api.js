const API = 'http://localhost:3000';
const api = async (endpoint, method = 'GET', body) => {
  const res = await fetch(API + endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`Erro ${res.status} em ${endpoint}`);
  return method === 'DELETE' ? null : res.json();
};
