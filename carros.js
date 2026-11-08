// Carros do agente: só é possível cadastrar, editar e excluir os próprios carros
const f = $('form-carro'), tb = $('tb-carros'), S = sessao();
const campos = ['matricula', 'ano', 'marca', 'modelo', 'placa', 'diaria', 'foto'];

const limpar = () => { f.reset(); f.cid.value = ''; };
const dono = async id => { const c = await api('/automoveis/' + id); return meu(c) ? c : null; };

const listar = async () => {
  const cs = (await api('/automoveis')).filter(meu);
  tb.innerHTML = cs.map(c => `<tr>
    <td>${c.id}</td><td>${img(c)}${c.marca} ${c.modelo}</td><td>${c.ano}</td><td>${c.placa}</td><td>R$ ${c.diaria}</td>
    <td>
      <button class="btn btn-sm btn-primary" onclick="editar('${c.id}')">Editar</button>
      <button class="btn btn-sm btn-danger" onclick="excluir('${c.id}')">Excluir</button>
    </td></tr>`).join('') || '<tr><td colspan="6">Nenhum carro cadastrado.</td></tr>';
};

const editar = async id => {
  const c = await dono(id);
  if (!c) return;
  limpar();
  f.cid.value = id;
  campos.forEach(k => f[k].value = c[k] ?? '');
  f.scrollIntoView();
};

const excluir = async id => {
  if (!await dono(id)) return;
  if ((await api('/pedidos')).some(p => p.automovelId == id)) return alert('Este carro possui pedidos e não pode ser excluído.');
  if (!confirm('Excluir carro?')) return;
  await api('/automoveis/' + id, 'DELETE');
  listar();
};

f.addEventListener('submit', async e => {
  e.preventDefault();
  const c = { ...Object.fromEntries(campos.map(k => [k, f[k].value])), proprietario: S.org, proprietarioId: S.id };
  c.ano = +c.ano;
  c.diaria = +c.diaria;
  const id = f.cid.value;
  if (id) {
    if (!await dono(id)) return;
    await api('/automoveis/' + id, 'PUT', { ...c, id });
  } else await api('/automoveis', 'POST', c);
  limpar();
  listar();
});

$('btn-limpar').onclick = limpar;
listar();
