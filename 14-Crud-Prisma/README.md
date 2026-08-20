<div align="center">

# 🐘 CRUD com Node.js puro, Prisma, Docker e PostgreSQL

**Exercício prático de back-end usando apenas o módulo `http` nativo do Node.js**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

> 📦 Parte do repositório [nodejs-exercicios](https://github.com/MeirelesDiogo/nodejs-exercicios) — ainda estou em formação, estudando Node.js e explorando ferramentas do ecossistema back-end.

Este projeto é um **CRUD** completo de uma tabela `Pessoa` (`id`, `nome`, `cidade` e `email`), construído com **Node.js puro** (sem frameworks como Express), usando **Prisma ORM 7** para acesso ao banco e **Docker** para rodar o **PostgreSQL** localmente.

<br>

## 🎯 Objetivo do exercício

Praticar:

- 🔌 Criação de servidor HTTP nativo do Node.js (`http` core module), sem frameworks
- 🧭 Roteamento manual de requisições (método + URL)
- 🗄️ Integração com banco de dados relacional via Prisma ORM
- 🐳 Uso de Docker/Docker Compose para subir um ambiente de banco de dados local
- ♻️ Operações CRUD completas (Create, Read, Update, Delete)
- 🖥️ Renderização de páginas HTML simples (cadastro, atualização e deleção) a partir do próprio servidor Node

<br>

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| [Node.js](https://nodejs.org/) | Servidor HTTP puro, sem framework |
| [Prisma ORM 7](https://www.prisma.io/) | Acesso ao banco, com driver adapter (`@prisma/adapter-pg`) |
| [PostgreSQL 16](https://www.postgresql.org/) | Banco de dados relacional |
| [Docker](https://www.docker.com/) / Docker Compose | Ambiente local de banco de dados |
| [nodemon](https://www.npmjs.com/package/nodemon) | Reinício automático em desenvolvimento |

<br>

## 📁 Estrutura do projeto

```
node-prisma-docker/
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── prisma.config.ts
├── src/
│   ├── prisma.js       # cliente Prisma com driver adapter
│   ├── server.js       # servidor HTTP puro + rotas
│   ├── criacao.html    # formulário de cadastro
│   ├── atualiza.html   # formulário de atualização
│   └── delete.html     # confirmação de deleção
├── .env
└── package.json
```

<br>

## 🗃️ Modelo de dados

```prisma
model Pessoa {
  id     Int    @id @default(autoincrement())
  nome   String
  cidade String
  email  String @unique
}
```

<br>

## 🚀 Como rodar o projeto

### ✅ Pré-requisitos
- Node.js instalado
- Docker Desktop instalado e em execução

### 1️⃣ Clonar o repositório e entrar na pasta do exercício

```bash
git clone https://github.com/MeirelesDiogo/nodejs-exercicios.git
cd nodejs-exercicios/14-Crud-Prisma/node-prisma-docker
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Subir o banco de dados com Docker

```bash
docker compose up -d
```

### 4️⃣ Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou use o exemplo já incluso):

```env
DATABASE_URL="postgresql://admin:admin123@localhost:5433/meubanco?schema=public"
```

### 5️⃣ Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6️⃣ Iniciar o servidor

```bash
npm run dev
```

> 🌐 O servidor sobe em `http://localhost:3000`

<br>

## 📡 Rotas disponíveis

| Método | Rota | Descrição |
|:---:|---|---|
| `GET` | `/cadastro` | Exibe um formulário HTML para cadastro de pessoas |
| `GET` | `/pessoas` | Lista todas as pessoas |
| `GET` | `/pessoas/:id` | Busca uma pessoa por ID |
| `POST` | `/pessoas` | Cria uma nova pessoa (também usada pelo formulário de `/cadastro`) |
| `GET` | `/atualizar/:id` | Exibe um formulário HTML pré-preenchido para atualizar a pessoa |
| `PUT` | `/pessoas` | Atualiza uma pessoa (o `id` vai no corpo da requisição) |
| `GET` | `/deletar/:id` | Exibe uma página HTML de confirmação para deletar a pessoa |
| `DELETE` | `/pessoas` | Remove uma pessoa (o `id` vai no corpo da requisição) |

> ⚠️ **Atenção:** `PUT` e `DELETE` não recebem o `id` pela URL — ele deve ser enviado no **corpo (body)** da requisição, junto com os demais dados quando aplicável.

<br>

### 📝 Página de cadastro — `GET /cadastro`

Acessando `http://localhost:3000/cadastro` no navegador, o servidor retorna uma página HTML com um formulário simples (nome, cidade e email). Ao ser enviado, o formulário faz uma requisição `POST` para a rota `/pessoas`, criando um novo registro no banco de dados.

### ✏️ Página de atualização — `GET /atualizar/:id`

Acessando `http://localhost:3000/atualizar/1`, por exemplo, o servidor busca a pessoa com esse ID no banco e retorna o formulário `atualiza.html` já preenchido com os dados atuais (nome, cidade e email). O formulário envia uma requisição `PUT` para `/pessoas` com o `id` e os novos dados no corpo.

### 🗑️ Página de deleção — `GET /deletar/:id`

Acessando `http://localhost:3000/deletar/1`, por exemplo, o servidor retorna a página `delete.html` com o ID preenchido, pedindo confirmação antes de disparar a requisição `DELETE` para `/pessoas` (com o `id` no corpo).

<br>

## 📬 Exemplos de requisição

<details>
<summary><b>➕ Criar pessoa — <code>POST /pessoas</code></summary>

```json
{
  "nome": "Ana",
  "cidade": "Belo Horizonte",
  "email": "ana@email.com"
}
```
</details>

<details>
<summary><b>♻️ Atualizar pessoa — <code>PUT /pessoas</code></summary>

```json
{
  "id": 1,
  "nome": "Ana Paula",
  "cidade": "Belo Horizonte",
  "email": "ana.paula@email.com"
}
```
</details>

<details>
<summary><b>🗑️ Deletar pessoa — <code>DELETE /pessoas</code></summary>

```json
{
  "id": 1
}
```
</details>

<br>

## 📚 Aprendizados

- ⚙️ Como configurar o Prisma ORM 7, incluindo as mudanças de configuração (uso do `prisma.config.ts` e driver adapters)
- 🧭 Como montar rotas manualmente com o módulo `http` nativo do Node.js, sem depender do Express
- 🖥️ Como servir páginas HTML (formulários de cadastro, atualização e deleção) diretamente pelo servidor Node, substituindo placeholders (`{{id}}`, `{{nome}}` etc.) sem um motor de templates
- 🐳 Como subir e gerenciar um banco PostgreSQL local usando Docker Compose

---

<div align="center">

📌 *Este repositório reúne exercícios feitos durante meus estudos de Node.js.*
*Ainda estou em formação — sugestões e feedbacks são bem-vindos!* 🙌

</div>