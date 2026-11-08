if (sessao()) location.replace(HOME[sessao().tipo]);
const fc = $('form-cliente-login'), fg = $('form-agente-login');

const aba = t => {
  fc.hidden = t != 'cliente';
  fg.hidden = t != 'agente';
  $('t-cliente').classList.toggle('active', t == 'cliente');
  $('t-agente').classList.toggle('active', t == 'agente');
};
$('t-cliente').onclick = () => aba('cliente');
$('t-agente').onclick = () => aba('agente');

(async () => {
  fg.agenteId.innerHTML = (await api('/agentes')).map(a => `<option value="${a.id}">${a.nome} (${a.tipo})</option>`).join('');
})();

fc.addEventListener('submit', async e => {
  e.preventDefault();
  const dig = s => s.replace(/\D/g, '');
  const c = (await api('/clientes')).find(x => dig(x.cpf) == dig(fc.cpf.value));
  if (!c) return alert('CPF não cadastrado. Crie sua conta primeiro.');
  entrar({ tipo: 'cliente', id: c.id, nome: c.nome });
  location.href = HOME.cliente;
});

fg.addEventListener('submit', async e => {
  e.preventDefault();
  const a = await api('/agentes/' + fg.agenteId.value);
  entrar({ tipo: 'agente', id: a.id, nome: a.nome, org: a.tipo });
  location.href = HOME.agente;
});
