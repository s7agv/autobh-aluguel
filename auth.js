const $ = id => document.getElementById(id);
const sessao = () => JSON.parse(sessionStorage.getItem('sessao') || 'null');
const entrar = s => sessionStorage.setItem('sessao', JSON.stringify(s));
const sair = () => { sessionStorage.removeItem('sessao'); location.href = 'login.html'; };
const meu = c => { const s = sessao(); return c.proprietario == s.org && c.proprietarioId == s.id; }; // carro do agente logado

const HOME = { cliente: 'index.html', agente: 'agente.html' };
const LINKS = {
  cliente: [['index.html', 'Frota'], ['pedidos.html', 'Meus Pedidos']],
  agente: [['agente.html', 'Pedidos'], ['carros.html', 'Meus Carros'], ['clientes.html', 'Clientes']]
};

// Tema salvo na sessão (igual ao login) e no localStorage; aplicado antes de desenhar a página
const tema = t => {
  document.documentElement.dataset.tema = t;
  document.documentElement.dataset.bsTheme = t;
  sessionStorage.setItem('tema', t);
  try { localStorage.setItem('tema', t); } catch {}
  if ($('btn-tema')) $('btn-tema').textContent = t == 'dark' ? 'Modo claro' : 'Modo escuro';
};
tema(sessionStorage.getItem('tema') || localStorage.getItem('tema') || 'light');

// Acesso por perfil: <html data-acesso="cliente|agente"> (sem atributo = página pública)
const acesso = document.documentElement.dataset.acesso, s0 = sessao();
const bloqueado = acesso && s0?.tipo != acesso;
if (bloqueado) {
  document.documentElement.hidden = true;
  window.stop();
  location.replace(s0 ? HOME[s0.tipo] : 'login.html');
}

document.addEventListener('DOMContentLoaded', () => {
  if (bloqueado) return;
  const s = sessao(), atual = location.pathname.split('/').pop() || 'index.html';
  const ativo = h => h == atual ? ' class="ativo"' : '';
  $('toc').innerHTML = '<p><strong>AutoBH Locadora</strong></p>' +
    (s ? LINKS[s.tipo].map(([h, t]) => `<a href="${h}"${ativo(h)}>${t}</a>`).join('') +
      (s.tipo == 'cliente' ? `<a href="conta.html" class="perfil${atual == 'conta.html' ? ' ativo' : ''}">${s.nome}</a>`
                           : `<span class="perfil">${s.nome}</span>`) : '') +
    '<button id="btn-tema" class="btn btn-sm btn-outline-light"></button>' +
    (s ? '<button id="btn-sair" class="btn btn-sm btn-outline-light">Sair</button>' : '');
  $('btn-tema').onclick = () => tema(document.documentElement.dataset.tema == 'dark' ? 'light' : 'dark');
  if (s) $('btn-sair').onclick = sair;
  tema(document.documentElement.dataset.tema);
});

addEventListener('unhandledrejection', () => alert('Erro ao acessar o JSON Server em localhost:3000.'));
