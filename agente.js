// Pedidos recebidos: o agente só vê e avalia pedidos dos seus próprios carros
const S = sessao(), fa = $('form-agente'), tb = $('tb-pedidos');
let D = { p: [] };

const avaliar = id => { fa.pedidoId.value = id; fa.scrollIntoView(); };

const carregar = async () => {
  const [c, a, p] = await Promise.all(['clientes', 'automoveis', 'pedidos'].map(e => api('/' + e)));
  const meus = a.filter(meu);
  D = { c, a, g: [], p: p.filter(x => meus.some(m => m.id == x.automovelId)) };
  $('agente-info').textContent = `${S.nome} (${S.org})`;
  $('campo-contrato').hidden = S.org != 'Banco';
  fa.pedidoId.innerHTML = opts(D.p.filter(x => x.status !== 'Cancelado'), x => `#${x.id} - ${by(c, x.clienteId).nome || '-'} - ${x.status}`);
  tb.innerHTML = D.p.map(x => linha(x, D, x.status !== 'Cancelado'
    ? `<button class="btn btn-sm btn-primary" onclick="avaliar('${x.id}')">Avaliar</button>` : '', false)).join('')
    || '<tr><td colspan="7">Nenhum pedido para os seus carros.</td></tr>';
};

fa.addEventListener('submit', async e => {
  e.preventDefault();
  const id = fa.pedidoId.value;
  if (!D.p.some(x => x.id == id)) return;
  const positivo = fa.status.value.startsWith('Parecer Positivo'), contrato = fa.contratoCredito.value.trim();
  await api('/pedidos/' + id, 'PATCH', {
    status: fa.status.value,
    agenteId: S.id,
    contratoCredito: positivo && S.org == 'Banco' && contrato ? contrato : null
  });
  fa.reset();
  carregar();
});

carregar();
