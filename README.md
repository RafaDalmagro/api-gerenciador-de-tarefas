# ✅ API - Gerenciador de Tarefas

API desenvolvida como parte do **Desafio Prático** do módulo da Rocketseat. O sistema tem como objetivo o gerenciamento completo de tarefas por equipes, com autenticação, níveis de acesso, e controle de status e prioridade das atividades.

---

## 🧾 Descrição

O sistema permite que **usuários criem contas, iniciem sessão e gerenciem tarefas**. Tarefas podem ser atribuídas a membros de um time, classificadas por **status**, **prioridade** e associadas a uma equipe.

- 👤 Autenticação e autorização com JWT
- 🧑‍🤝‍🧑 Criação e gestão de times por administradores
- 📝 CRUD completo de tarefas
- 🚦 Classificação por status e prioridade
- 📊 Visualização personalizada conforme o tipo de usuário (admin ou membro)

---

## 🚀 Tecnologias e Recursos

- **Backend**: Node.js + Express
- **Banco de dados**: PostgreSQL
- **ORM**: Prisma
- **Validação de dados**: Zod
- **Autenticação**: JWT (JSON Web Token)
- **Linguagem**: TypeScript
- **Testes**: Jest
- **Containerização**: Docker
- **Deploy**: Render (backend)

---

## ⚙️ Funcionalidades da Aplicação

### 🔐 Autenticação e Autorização

- Criação de conta e login com sessão autenticada
- Autenticação via **JWT**
- Dois níveis de acesso:
  - **Admin**: gerencia usuários, tarefas e times
  - **Membro**: gerencia apenas suas próprias tarefas

### 🧑‍🤝‍🧑 Gerenciamento de Times

- **Apenas admins** podem criar, editar ou excluir times
- **Apenas admins** podem adicionar/remover membros de um time

### 📝 Tarefas

- CRUD completo de tarefas
- Status da tarefa:
  - `Pendente` (`pending`)
  - `Em progresso` (`in_progress`)
  - `Concluído` (`completed`)
- Prioridade da tarefa:
  - `Alta` (`high`)
  - `Média` (`medium`)
  - `Baixa` (`low`)
- Tarefas são atribuídas a membros específicos de um time

### 👥 Permissões por tipo de usuário

- **Admin**:
  - Visualiza e gerencia todas as tarefas, usuários e times
- **Membro**:
  - Visualiza tarefas do seu time
  - Pode editar **apenas suas próprias tarefas**

---

## 🗃️ Estrutura do Banco de Dados

### 1. `users`

| Campo       | Tipo              | Descrição                          |
|-------------|-------------------|------------------------------------|
| id          | INTEGER (PK)      | Identificador único                |
| name        | VARCHAR(100)      | Nome do usuário                    |
| email       | VARCHAR(150)      | E-mail (único)                     |
| password    | VARCHAR(255)      | Senha hash                         |
| role        | ENUM(admin, member)| Nível de acesso                    |
| created_at  | TIMESTAMP         | Data de criação                    |
| updated_at  | TIMESTAMP         | Última atualização                 |

---

### 2. `teams`

| Campo       | Tipo          | Descrição                          |
|-------------|---------------|------------------------------------|
| id          | INTEGER (PK)  | Identificador único                |
| name        | VARCHAR(100)  | Nome do time                       |
| description | TEXT          | Descrição opcional                 |
| created_at  | TIMESTAMP     | Data de criação                    |
| updated_at  | TIMESTAMP     | Última atualização                 |

---

### 3. `team_members`

| Campo       | Tipo          | Descrição                          |
|-------------|---------------|------------------------------------|
| id          | INTEGER (PK)  | Identificador único                |
| user_id     | INTEGER (FK)  | Referência para `users.id`         |
| team_id     | INTEGER (FK)  | Referência para `teams.id`         |
| created_at  | TIMESTAMP     | Data de criação                    |

---

### 4. `tasks`

| Campo        | Tipo                       | Descrição                                |
|--------------|----------------------------|------------------------------------------|
| id           | INTEGER (PK)               | Identificador único                      |
| title        | VARCHAR(200)               | Título da tarefa                         |
| description  | TEXT                       | Descrição opcional                       |
| status       | ENUM(pending, in_progress, completed) | Status da tarefa            |
| priority     | ENUM(high, medium, low)    | Prioridade da tarefa                     |
| assigned_to  | INTEGER (FK para `users.id`)| Usuário responsável                      |
| team_id      | INTEGER (FK para `teams.id`)| Time relacionado                         |
| created_at   | TIMESTAMP                  | Data de criação                          |
| updated_at   | TIMESTAMP                  | Última atualização                       |

---

### 5. `task_history` (opcional)

| Campo       | Tipo                     | Descrição                                   |
|-------------|--------------------------|---------------------------------------------|
| id          | INTEGER (PK)             | Identificador único                         |
| task_id     | INTEGER (FK para `tasks.id`)   | Tarefa relacionada                      |
| changed_by  | INTEGER (FK para `users.id`)   | Usuário que fez a alteração             |
| old_status  | ENUM                     | Status anterior                             |
| new_status  | ENUM                     | Novo status                                 |
| changed_at  | TIMESTAMP                | Data da alteração                           |

---

## ▶️ Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar o servidor em desenvolvimento
npm run dev

# Rodar os testes com Jest
npm run test

# Executar migrations do Prisma
npx prisma migrate dev

# Gerar os tipos do Prisma
npx prisma generate
```

---

## 🐳 Docker

```bash
# Subir containers da aplicação e banco de dados
docker-compose up -d
```

---

## 🌐 Deploy

A aplicação está preparada para ser publicada na plataforma [Render](https://render.com/), com suporte a PostgreSQL e variáveis de ambiente definidas via painel.

---

## ✍️ Autor e créditos

- 💻 Desenvolvido por: **Rafael Lima Dalmagro**
- 📘 Desafio proposto por: [Rocketseat](https://www.rocketseat.com.br/)

---

## 📘 Licença

Este projeto está licenciado sob a licença **ISC**.
