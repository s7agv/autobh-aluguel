// Cadastro (público) e Minha Conta (cliente logado)
const f = $('form-cliente'), S = acesso ? sessao() : null;
const campos = ['nome', 'rg', 'cpf', 'endereco', 'profissao'];
const dig = s => s.replace(/\D/g, '');

if (S) (async () => {
  const c = await api('/clientes/' + S.id);
  campos.forEach(k => f[k].value = c[k]);
  c.rendimentos.forEach((r, i) => {
    f['emp' + (i + 1)].value = r.empregador;
    f['val' + (i + 1)].value = r.valor;
  });
})();

f.addEventListener('submit', async e => {
  e.preventDefault();
  const c = Object.fromEntries(campos.map(k => [k, f[k].value]));
  c.rendimentos = [1, 2, 3]
    .map(i => ({ empregador: f['emp' + i].value, valor: +f['val' + i].value }))
    .filter(r => r.empregador);
  if (S) {
    await api('/clientes/' + S.id, 'PUT', { ...c, id: S.id });
    entrar({ ...S, nome: c.nome });
    alert('Dados atualizados.');
    return location.reload();
  }
  if ((await api('/clientes')).some(x => dig(x.cpf) == dig(c.cpf))) return alert('CPF já cadastrado.');
  const novo = await api('/clientes', 'POST', c);
  entrar({ tipo: 'cliente', id: novo.id, nome: novo.nome });
  location.href = HOME.cliente;
});

if ($('btn-excluir')) $('btn-excluir').onclick = async () => {
  if (!confirm('Excluir sua conta e todos os seus pedidos?')) return;
  for (const p of (await api('/pedidos')).filter(p => p.clienteId == S.id)) await api('/pedidos/' + p.id, 'DELETE');
  await api('/clientes/' + S.id, 'DELETE');
  sair();
};
