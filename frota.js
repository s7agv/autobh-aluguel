(async () => {
  const [as, ps] = await Promise.all([api('/automoveis'), api('/pedidos')]);
  const ocupado = id => ps.some(p => p.automovelId == id && p.status.startsWith('Parecer Positivo'));
  $('frota').innerHTML = as.map(c => `<article class="carro">
    ${img(c)}
    <div>
      <h3>${c.marca} ${c.modelo}</h3>
      <p>Ano ${c.ano}</p>
      <p>Placa ${c.placa}</p>
      <p class="preco">R$ ${c.diaria} <small>/dia</small></p>
      <span class="tag">Proprietário: ${c.proprietario}</span>
      ${ocupado(c.id)
        ? '<button class="btn btn-secondary btn-sm d-block w-100 mt-2" disabled>Indisponível</button>'
        : `<button class="btn btn-primary btn-sm d-block w-100 mt-2" onclick="abrirPedido(null,'${c.id}')">Alugar</button>`}
    </div></article>`).join('');
})();

window.aposSalvar = () => {
  $('msg').innerHTML = '<div class="alert alert-success">Pedido enviado! Acompanhe o status em Meus Pedidos.</div>';
};
