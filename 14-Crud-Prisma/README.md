# 🐘 CRUD com Node.js puro, Prisma, Docker e PostgreSQL

> Exercício prático do repositório [nodejs-exercicios](https://github.com/MeirelesDiogo/nodejs-exercicios) — ainda estou em formação, estudando Node.js e explorando ferramentas do ecossistema back-end.

Este projeto é um CRUD simples de uma tabela `Pessoa` (id, nome, cidade e email), construído com **Node.js puro** (sem frameworks como Express), usando **Prisma ORM 7** para acesso ao banco e **Docker** para rodar o **PostgreSQL** localmente.

## 🎯 Objetivo do exercício

Praticar:
- Criação de servidor HTTP nativo do Node.js (`http` core module), sem frameworks;
- Roteamento manual de requisições (método + URL);
- Integração com banco de dados relacional via Prisma ORM;
- Uso de Docker/Docker Compose para subir um ambiente de banco de dados local;
- Operações CRUD completas (Create, Read, Update, Delete).

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/) — servidor HTTP puro, sem framework
- [Prisma ORM 7](https://www.prisma.io/) — com driver adapter (`@prisma/adapter-pg`)
- [PostgreSQL 16](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) e Docker Compose
- [nodemon](https://www.npmjs.com/package/nodemon) — reinício automático em desenvolvimento

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
│   └── server.js       # servidor HTTP puro + rotas
├── .env
└── package.json
```

## 🗃️ Modelo de dados

```prisma
model Pessoa {
  id     Int    @id @default(autoincrement())
  nome   String
  cidade String
  email  String @unique
}
```

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Docker Desktop instalado e em execução

### 1. Clonar o repositório e entrar na pasta do exercício

```bash
git clone https://github.com/MeirelesDiogo/nodejs-exercicios.git
cd nodejs-exercicios/14-Crud-Prisma/node-prisma-docker
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Subir o banco de dados com Docker

```bash
docker compose up -d
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou use o exemplo já incluso):

```
DATABASE_URL="postgresql://admin:admin123@localhost:5433/meubanco?schema=public"
```

### 5. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Iniciar o servidor

```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## 📡 Rotas disponíveis

| Método | Rota            | Descrição                  |
|--------|-----------------|-----------------------------|
| GET    | `/pessoas`      | Lista todas as pessoas      |
| GET    | `/pessoas/:id`  | Busca uma pessoa por ID     |
| POST   | `/pessoas`      | Cria uma nova pessoa        |
| PUT    | `/pessoas/:id`  | Atualiza uma pessoa         |
| DELETE | `/pessoas/:id`  | Remove uma pessoa           |

### Exemplo de corpo para criação (POST)

```json
{
  "nome": "Ana",
  "cidade": "Belo Horizonte",
  "email": "ana@email.com"
}
```

## 📚 Aprendizados

- Como configurar o Prisma ORM 7, incluindo as mudanças de configuração (uso do `prisma.config.ts` e driver adapters);
- Como montar rotas manualmente com o módulo `http` nativo do Node.js, sem depender do Express;
- Como subir e gerenciar um banco PostgreSQL local usando Docker Compose.

---

📌 Este repositório reúne exercícios feitos durante meus estudos de Node.js. Ainda estou em formação — sugestões e feedbacks são bem-vindos!