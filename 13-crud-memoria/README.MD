# CRUD em Memória — Usuários

API simples feita com o módulo nativo `http` do Node.js (sem framework), que armazena os usuários **em memória** (um array), servida na porta `3000`.

## Como rodar

```bash
node index.js
```

Servidor sobe em: `http://localhost:3000`

## Rotas

| Método | Rota            | Descrição                                                       |
|--------|-----------------|------------------------------------------------------------------|
| GET    | `/`             | Página inicial com o formulário de cadastro (`index.html`)       |
| GET    | `/usuarios`     | Lista todos os usuários cadastrados                              |
| POST   | `/usuarios`     | Cadastra um novo usuário                                         |
| GET    | `/usuarios/:id` | Busca um usuário específico pelo `id`                            |
| GET    | `/alterar`      | Página informativa sobre como alterar um usuário (`put.html`)    |
| GET    | `/alterar/:id`  | Formulário de edição já preenchido com os dados do usuário       |
| PUT    | `/alterar/:id`  | Atualiza os dados do usuário com o `id` informado                |
| GET    | `/remover`      | Página informativa sobre como remover um usuário (`remover.html`)|
| GET    | `/remover/:id`  | Página de confirmação para remover o usuário com o `id`          |
| DELETE | `/remover/:id`  | Remove o usuário com o `id` informado                            |

### Detalhes de cada rota

#### `GET /`
Retorna `index.html`, com o formulário para cadastrar um novo usuário (nome, email, cidade). O próprio formulário dispara a requisição `POST /usuarios` via `fetch`.

#### `GET /usuarios`
Retorna, em JSON, a lista com todos os usuários cadastrados em memória.

#### `POST /usuarios`
Recebe um JSON no corpo da requisição:
```json
{
  "nome": "Diogo",
  "email": "diogo@gmail.com",
  "cidade": "Belo Horizonte"
}
```
Gera um novo `id` automaticamente (último id + 1) e adiciona o usuário na lista em memória.

#### `GET /usuarios/:id`
Retorna o usuário correspondente ao `id` em JSON. Se não encontrar, retorna uma mensagem em HTML avisando que o usuário não existe.

#### `GET /alterar`
Retorna `put.html`, uma página explicando que, para editar um usuário, é preciso acessar `/alterar/:id`.

#### `GET /alterar/:id`
Busca o usuário pelo `id` e retorna `reqput.html` com os campos (`nome`, `email`, `cidade`) já preenchidos com os dados atuais.

#### `PUT /alterar/:id`
Recebe um JSON no corpo da requisição com os campos a atualizar:
```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "cidade": "Nova Cidade"
}
```
Atualiza apenas os campos enviados e retorna uma mensagem de confirmação em JSON.

#### `GET /remover`
Retorna `remover.html`, uma página explicando que, para remover um usuário, é preciso acessar `/remover/:id`.

#### `GET /remover/:id`
Retorna `reqDelete.html` com o `id` do usuário já preenchido em um input, junto de um botão para confirmar a exclusão.

#### `DELETE /remover/:id`
Remove da lista em memória o usuário com o `id` informado.

## Arquivos do projeto

```
├── index.js          # servidor HTTP e todas as rotas (NÃO alterado)
├── index.html         # formulário de cadastro (POST /usuarios)
├── put.html            # instruções da rota de alteração (GET /alterar)
├── reqput.html         # formulário de edição de um usuário (GET e PUT /alterar/:id)
├── remover.html        # instruções da rota de remoção (GET /remover)
├── reqDelete.html       # confirmação de remoção de um usuário (GET e DELETE /remover/:id)
└── README.md
```

> **Observação:** como os dados ficam em memória (array), tudo é perdido quando o servidor é reiniciado.