# ✅ API Gerenciadora de Tarefas

API desenvolvida como parte do desafio prático da trilha Full Stack da **Rocketseat**, com o objetivo de criar um sistema completo de gerenciamento de tarefas. Os usuários podem se registrar, autenticar e gerenciar tarefas atribuídas a diferentes membros da equipe, com controle de status e prioridade.

## 🧾 Descrição

O sistema permite:

- 👤 **Cadastro e autenticação de usuários**
- 📝 **Criação, edição, listagem e remoção de tarefas**
- 🔗 **Atribuição de tarefas a usuários**
- 🚦 **Classificação de tarefas por status (pendente, em andamento, concluída)**
- ⚡ **Definição de prioridade das tarefas (baixa, média, alta)**
- 🛡️ **Autenticação via JWT**
- ✅ **Validação de dados com Zod**

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express.js** (framework HTTP)
- **TypeScript**
- **PostgreSQL** (banco de dados relacional)
- **Prisma** (ORM)
- **Zod** (validação de esquemas)
- **JWT** (autenticação via token)
- **Jest** (testes automatizados)
- **Docker** (ambiente de desenvolvimento)
- **Render** (deploy do backend)

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/api-gerenciador-tarefas.git
cd api-gerenciador-tarefas

# Instalar as dependências
npm install
```

## ▶️ Scripts disponíveis

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev

# Rodar os testes com Jest
npm run test

# Rodar as migrations do Prisma
npx prisma migrate dev

# Gerar os tipos do Prisma
npx prisma generate
```

## 🐳 Usando com Docker

```bash
# Subir os containers (banco de dados e app)
docker-compose up -d
```

Certifique-se de configurar corretamente seu arquivo `.env` com as credenciais do banco de dados PostgreSQL.

## 🧪 Testes

Este projeto utiliza **Jest** como framework de testes. Para rodar os testes:

```bash
npm run test
```

## 🌐 Deploy

O backend está hospedado na plataforma [Render](https://render.com/), com integração contínua para atualização automática a cada novo push na branch principal.

## 📁 Estrutura de Pastas

```
src/
├── controllers/
├── config/
├── middlewares/
├── routes/
├── services/
├── types/
├── database/
│   └── prisma/
└── utils/
```

## 🛡️ Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação. Após o login, o usuário recebe um token que deve ser enviado no cabeçalho `Authorization` para rotas protegidas:

```
Authorization: Bearer <seu_token>
```

## 🧠 O que foi praticado

- ✅ Criação de APIs REST com Express
- ✅ Gerenciamento de banco de dados com Prisma e PostgreSQL
- ✅ Validação de dados com Zod
- ✅ Autenticação JWT
- ✅ Testes automatizados com Jest
- ✅ Deploy com Docker e Render

## ✍️ Autor

- Rafael Lima Dalmagro

## 📘 Licença

Este projeto está licenciado sob a licença **ISC**.
