// Clientes que fizeram pedidos para carros do agente (somente leitura, com busca por nome)
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

(async () => {
  const [c, a, p] = await Promise.all(['clientes', 'automoveis', 'pedidos'].map(e => api('/' + e)));
  const meus = a.filter(meu);
  const ids = new Set(p.filter(x => meus.some(m => m.id == x.automovelId)).map(x => String(x.clienteId)));
  const meusClientes = c.filter(x => ids.has(String(x.id)));

  const desenhar = () => {
    const q = norm($('busca').value.trim());
    $('tb-clientes').innerHTML = meusClientes.filter(x => norm(x.nome).includes(q)).map(x => `<tr>
      <td>${x.nome}</td><td>${x.cpf}</td><td>${x.profissao}</td>
      <td>${x.rendimentos.map(r => `${r.empregador}: R$ ${r.valor}`).join('<br>')}</td>
      <td>R$ ${x.rendimentos.reduce((s, r) => s + r.valor, 0)}</td></tr>`).join('')
      || '<tr><td colspan="5">Nenhum cliente encontrado.</td></tr>';
  };
  $('busca').oninput = desenhar;
  desenhar();
})();
