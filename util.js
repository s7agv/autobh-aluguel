const SEM_FOTO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="28">Sem foto</text></svg>');
const img = c => `<img src="${c.foto || SEM_FOTO}" alt="${c.marca || ''} ${c.modelo || ''}" onerror="this.onerror=null;this.src=SEM_FOTO">`;
const by = (lista, id) => lista.find(x => x.id == id) || {};
const opts = (lista, txt) => lista.map(x => `<option value="${x.id}">${txt(x)}</option>`).join('');

const ST = { 'Pendente': 'pendente', 'Parecer Positivo - Contrato Executado': 'positivo', 'Parecer Negativo': 'negativo', 'Cancelado': 'cancelado' };
const badge = s => `<span class="badge-st ${ST[s]}">${s}</span>`;

// Linha da tabela de pedidos: visão do cliente (mostra o agente) ou do agente (mostra o cliente)
const linha = (x, D, acoes, cliente) => {
  const car = by(D.a, x.automovelId);
  return `<tr><td>${x.id}</td>${cliente ? '' : `<td>${by(D.c, x.clienteId).nome || '-'}</td>`}
    <td>${img(car)}${car.marca} ${car.modelo} (${car.placa})</td><td>${x.data}</td><td>${badge(x.status)}</td>
    ${cliente ? `<td>${by(D.g, x.agenteId).nome || '-'}</td>` : ''}<td>${x.contratoCredito || '-'}</td><td>${acoes}</td></tr>`;
};
