---

# 🚗 Sistema de Aluguel de Carros 👨‍💻

> [!NOTE]
> Sistema web para efetuar, consultar, modificar e cancelar pedidos de aluguel de automóveis, com análise financeira, execução de contrato e crédito concedidos por agentes (empresas e bancos).

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Protótipo do <b>Laboratório 02</b> de <b>Desenvolvimento de Interfaces Web (DIW)</b>, PUC Minas. Clientes se cadastram, escolhem um carro e enviam pedidos; agentes avaliam os pedidos dos seus próprios carros. Feito com <b>HTML5</b>, <b>CSS3</b>, <b>JavaScript</b>, <b>Bootstrap 5</b> e <b>JSON Server</b> consumido via <b>Fetch API</b>.
      </div>
    </td>
    <td>
      <img src="https://joaopauloaramuni.github.io/image/cc-puc.jpg" alt="Logo do Projeto" width="120px"/>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v2.0.0-blue?style=for-the-badge) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) ![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.4-007ec6?style=for-the-badge&logo=json&logoColor=white)

---

## 📚 Índice
- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Testes](#-testes)
- [Documentações utilizadas](#-documentações-utilizadas)
- [Autores](#-autores)
- [Contribuição](#-contribuição)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 🔗 Links Úteis
* 🌐 **Repositório:** [GitHub](https://github.com/s7agv/autobh-aluguel/)
* 📖 **Documentação:** modelos UML em [`diagramas.odt`](./diagramas.odt) e capturas de tela em [`prints-funcionamento.odt`](./prints-funcionamento.odt)

---

## 📝 Sobre o Projeto
- **Por que existe:** projeto prático do LAB02 (DIW), exercitando modelagem UML e desenvolvimento web integrado a uma API REST.
- **Problema que resolve:** informatiza a solicitação, alteração, cancelamento e avaliação financeira de aluguéis, ligando clientes a agentes.
- **Contexto:** acadêmico, PUC Minas.
- **Onde usar:** locadoras e instituições financeiras que concedem crédito para locação.

### Histórias do Usuário

| ID | Como... | Eu quero... | Para que... |
| :--- | :--- | :--- | :--- |
| **HU01** | Visitante | Me cadastrar (`cadastro.html`) e entrar (`login.html`) | Usar o sistema após cadastro prévio. |
| **HU02** | Cliente | Consultar, atualizar e excluir minha conta (`conta.html`) | Manter meus dados e rendimentos atualizados. |
| **HU03** | Cliente | Ver a frota e alugar um carro em um pop-up (`index.html`) | Enviar um pedido de aluguel. |
| **HU04** | Cliente | Consultar, modificar (se pendente) e cancelar meus pedidos (`pedidos.html`) | Acompanhar o status do aluguel. |
| **HU05** | Agente | Avaliar os pedidos dos meus carros (`agente.html`), gerenciar meus carros (`carros.html`) e buscar clientes por nome (`clientes.html`) | Analisar financeiramente e decidir sobre o contrato. |
| **HU06** | Agente Banco | Associar um contrato de crédito ao parecer positivo (`agente.html`) | Financiar o aluguel do cliente. |

---

## ✨ Funcionalidades Principais
- 🔐 **Cadastro e login:** só acessa o sistema quem tem cadastro; páginas separadas para cliente e agente.
- 👤 **CRUD de cliente:** RG, CPF, nome, endereço, profissão e até 3 rendimentos (`clientes.js`).
- 🚗 **Frota:** cada agente cadastra e edita apenas os próprios carros (`carros.js`); o cliente vê a frota com foto e diária (`frota.js`).
- 📋 **Pedidos:** o cliente cria, modifica e cancela; o status é atualizado pelo agente (`pedidos.js`, `agente.js`).
- 💳 **Crédito:** agentes do tipo Banco anexam o contrato de crédito ao parecer.
- 🌗 **Tema claro e escuro.**

---

## 🛠 Tecnologias Utilizadas
* **Front-end:** HTML5, CSS3, JavaScript (ES6+) e Bootstrap 5.3 via CDN
* **API / persistência:** JSON Server 0.17.4 (Node.js LTS) com `db.json`
* **Comunicação:** Fetch API (`api.js`)

---

## 🏗 Arquitetura

O servidor central (JSON Server) atende os computadores dos clientes e dos agentes. O sistema tem dois subsistemas:

1. **Construção dinâmica das páginas web:** as 8 páginas HTML, `style.css`, `util.js`, `login.js` e `lista.js`.
2. **Gestão de pedidos e contratos:** `auth.js`, `clientes.js`, `pedidos.js`, `agente.js`, `carros.js`, `frota.js` e `migrar.js`, com `api.js` e `db.json` na persistência.

Coleções do `db.json`: `clientes` (com `rendimentos` embutidos), `automoveis` (`proprietario` e `proprietarioId`), `agentes` (`tipo`: Empresa ou Banco) e `pedidos` (`clienteId`, `automovelId`, `agenteId`, `status`, `contratoCredito`).

### Diagramas

O arquivo [`diagramas.odt`](./diagramas.odt) reúne os quatro diagramas em duas versões: a **Versão 1**, feita antes da maior parte do código, e a **Versão final**, feita após o código.

1. Diagrama de Casos de Uso
2. Diagrama de Classes
3. Diagrama de Pacotes (Visão Lógica)
4. Diagrama de Componentes

---: | :---: |
| <img src="img/casos-de-uso.png" alt="Diagrama de Casos de Uso" width="380px"> | <img src="img/classes.png" alt="Diagrama de Classes" width="380px"> |
| **Pacotes (Visão Lógica)** | **Componentes** |
| <img src="img/pacotes.png" alt="Diagrama de Pacotes" width="380px"> | <img src="img/componentes.png" alt="Diagrama de Componentes" width="380px"> |

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Node.js:** versão LTS (v18 ou superior)
* Navegador moderno (opcional: extensão Live Server)

### Como Executar

```bash
git clone https://github.com/s7agv/autobh-aluguel.git
cd autobh-aluguel
npx json-server@0.17.4 --watch db.json --port 3000
```

Abra `login.html` no navegador. Contas de demonstração:

| Perfil | Como entrar |
| :--- | :--- |
| Cliente | CPF `111.111.111-11` (Ana Souza) ou crie uma conta em **Criar conta** |
| Agente Empresa | escolha **LocaMinas Ltda** |
| Agente Banco | escolha **Banco Mineiro** |

Se você tiver um `db.json` antigo, pare o servidor e rode `node migrar.js` para atualizar os carros sem perder dados.

---

## 🚀 Deploy
Não se aplica: protótipo executado localmente (JSON Server na porta `3000`).

---

## 📂 Estrutura de Pastas

```
.
├── README.md
├── db.json          # 💾 clientes, automoveis, agentes, pedidos
├── style.css        # 🎨 estilos e temas claro/escuro
├── login.html  cadastro.html  conta.html  index.html  pedidos.html   # 🧑 páginas do cliente e públicas
├── agente.html  carros.html  clientes.html                           # 🏦 páginas do agente
├── api.js           # 🔌 Fetch API
├── auth.js          # 🛡️ sessão, acesso por perfil, menu e tema
├── util.js          # 🛠️ funções de interface (imagem, tabela, badge)
├── login.js  clientes.js  frota.js  pedidos.js      # 🎮 cliente
├── agente.js  carros.js  lista.js                   # 🎮 agente
├── migrar.js        # 🔄 atualiza um db.json antigo
├── diagramas.odt             # 📐 modelos UML (versão 1 e versão final)
└── prints-funcionamento.odt  # 🖼️ capturas de tela do sistema
```

---

## 🎥 Demonstração

As capturas de tela estão em [`prints-funcionamento.odt`](./prints-funcionamento.odt): login do cliente, criação e edição de conta, frota, criação de pedido de aluguel, conferência e alteração do pedido, e a tela de aprovação de pedidos do agente.

---: | :---: |
| **Login (`login.html`)** | **Frota e pop-up de aluguel (`index.html`)** |
| <img src="img/tela-login.png" alt="Login" width="380px"> | <img src="img/tela-frota.png" alt="Frota" width="380px"> |
| **Meus Pedidos (`pedidos.html`)** | **Avaliação do agente (`agente.html`)** |
| <img src="img/tela-pedidos.png" alt="Pedidos" width="380px"> | <img src="img/tela-agente.png" alt="Agente" width="380px"> |

---

## 🧪 Testes
Testes manuais no navegador:
1. Criar conta, entrar, editar e excluir a conta.
2. Alugar um carro pelo pop-up, modificar e cancelar o pedido.
3. Entrar como agente, dar parecer, anexar contrato de crédito (Banco) e conferir o status na conta do cliente.

---

## 🔗 Documentações utilizadas
* 📖 [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
* 📖 [JSON Server](https://github.com/typicode/json-server)
* 📖 [Fetch API (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)

---

## 👥 Autores

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| Gustavo Ramos Starling | <div align="center"><img src="https://avatars.githubusercontent.com/u/46657911?s=60&v=4" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/s7agv"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/gustavostarling/"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:gustavoramos.starling@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |

---

## 📄 Licença
Projeto acadêmico desenvolvido para a disciplina DIW (PUC Minas).

---
