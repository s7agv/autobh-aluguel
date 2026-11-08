// Pedidos do cliente: pop-up de aluguel/edição e tabela "Meus Pedidos"
const S = sessao(), tb = $('tb-pedidos');
let L = [];

document.body.insertAdjacentHTML('beforeend', `
<div class="modal fade" id="modal-pedido" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <form id="form-pedido" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-titulo">Novo Pedido de Aluguel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="pid">
        <div id="prev"></div>
        Automóvel: <select name="automovelId" class="fw" required></select><br>
        Data: <input type="date" name="data" class="fw" required>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-success">Enviar Pedido</button>
      </div>
    </form>
  </div>
</div>`);
const fp = $('form-pedido');

const prev = () => {
  const c = by(L, fp.automovelId.value);
  $('prev').innerHTML = img(c) + `<p class="preco">R$ ${c.diaria} <small>/dia</small></p>`;
};

const abrirPedido = async (id, carroId) => {
  const [a, ps, x] = await Promise.all([api('/automoveis'), api('/pedidos'), id ? api('/pedidos/' + id) : {}]);
  L = a.filter(c => c.id == x.automovelId || !ps.some(p => p.automovelId == c.id && p.status.startsWith('Parecer Positivo')));
  fp.automovelId.innerHTML = opts(L, c => `${c.marca} ${c.modelo} - R$ ${c.diaria}/dia`);
  fp.pid.value = id || '';
  fp.automovelId.value = x.automovelId || carroId || L[0].id;
  fp.data.value = x.data || '';
  fp.data.min = id ? '' : new Date().toISOString().slice(0, 10);
  $('modal-titulo').textContent = id ? 'Modificar Pedido' : 'Novo Pedido de Aluguel';
  prev();
  bootstrap.Modal.getOrCreateInstance($('modal-pedido')).show();
};

const carregar = async () => {
  const [c, a, g, p] = await Promise.all(['clientes', 'automoveis', 'agentes', 'pedidos'].map(e => api('/' + e)));
  const D = { c, a, g, p: p.filter(x => x.clienteId == S.id) };
  tb.innerHTML = D.p.map(x => linha(x, D, x.status === 'Pendente'
    ? `<button class="btn btn-sm btn-primary" onclick="abrirPedido('${x.id}')">Editar</button>
       <button class="btn btn-sm btn-danger" onclick="cancelar('${x.id}')">Cancelar</button>` : '', true)).join('')
    || '<tr><td colspan="7">Você ainda não fez pedidos. Escolha um carro na Frota.</td></tr>';
};

const cancelar = async id => {
  if (!confirm('Cancelar pedido?')) return;
  await api('/pedidos/' + id, 'PATCH', { status: 'Cancelado' });
  carregar();
};

fp.automovelId.onchange = prev;
fp.addEventListener('submit', async e => {
  e.preventDefault();
  const d = { automovelId: fp.automovelId.value, data: fp.data.value };
  const id = fp.pid.value;
  await (id ? api('/pedidos/' + id, 'PATCH', d)
            : api('/pedidos', 'POST', { ...d, clienteId: S.id, status: 'Pendente', agenteId: null, contratoCredito: null }));
  bootstrap.Modal.getInstance($('modal-pedido')).hide();
  if (tb) carregar();
  window.aposSalvar?.();
});

if (tb) carregar();
