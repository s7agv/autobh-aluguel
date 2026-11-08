// Atualiza um db.json antigo sem perder dados: node migrar.js (com o json-server parado)
const fs = require('fs'), d = JSON.parse(fs.readFileSync('db.json'));
const dia = { 1: 120, 2: 140, 3: 130, 4: 190, 5: 210 };
for (const c of d.automoveis) {
  if (c.proprietario == 'Cliente') c.proprietario = 'Empresa';
  c.proprietarioId ??= d.agentes.find(a => a.tipo == c.proprietario)?.id;
  c.diaria ??= dia[c.id] ?? 150;
}
fs.writeFileSync('db.json', JSON.stringify(d, null, 2));
console.log('db.json atualizado:', d.automoveis.length, 'carros');
