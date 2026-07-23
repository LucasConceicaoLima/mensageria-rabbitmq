# Mensageria - E-commerce Assíncrono com RabbitMQ

Projeto Full Stack desenvolvido para demonstrar processamento assíncrono de pedidos utilizando **RabbitMQ**, com frontend em **React**, backend em **NestJS** e persistência em **MySQL** via **Prisma ORM**.

## Objetivo

Simular o fluxo de um pequeno e-commerce onde um pedido é criado pela API, enviado para uma fila RabbitMQ e processado por um Worker separado, atualizando o status do pedido de forma assíncrona.

---

## Arquitetura

```
Frontend (React)
       |
       v
Backend API (NestJS)
       |
       v
MySQL (Prisma ORM)
       |
       v
RabbitMQ Queue
       |
       v
Worker (NestJS)
       |
       v
Atualização do Pedido
```

---

## Tecnologias Utilizadas

### Frontend

* React + TypeScript
* React Query (TanStack Query)
* React Hook Form
* Zod
* Material UI (MUI)
* MUI X Charts
* React Router DOM

### Backend

* NestJS
* Prisma ORM
* MySQL
* Swagger/OpenAPI
* RabbitMQ (amqplib)

### Infraestrutura

* Docker
* Docker Compose
* RabbitMQ Management

---

## Funcionalidades

### Produtos

* Criar produto
* Editar produto
* Excluir produto
* Listar produtos
* Validação de formulário com Zod
* Feedback com Snackbar

### Pedidos

* Criar pedido
* Listar pedidos
* Visualizar detalhes do pedido
* Timeline de eventos do pedido
* Atualização automática de status pelo Worker

### Dashboard

* Total de pedidos
* Pedidos pendentes
* Pedidos aprovados
* Pedidos rejeitados
* Gráfico de pedidos por status
* Gráfico de receita por status
* Últimos pedidos processados

### UX

* Skeletons de carregamento
* Snackbar reutilizável
* Estados de loading
* Interface responsiva

---

## Fluxo de Processamento

1. Usuário cria um pedido pelo frontend.
2. A API salva o pedido com status `PENDING`.
3. A API publica uma mensagem na fila `order-created-queue`.
4. O Worker consome a mensagem.
5. O Worker simula o processamento do pagamento.
6. O pedido é atualizado para `APPROVED` ou `REJECTED`.
7. Um evento é registrado na timeline do pedido.
8. O Dashboard é atualizado automaticamente.

---

## Estrutura do Projeto

```
Mensageria/
├── frontend/
├── backend/
├── worker/
└── docker-compose.yml
```

---

## Como Executar

### 1. Subir infraestrutura

```bash
docker compose up -d
```

Serviços disponíveis:

* MySQL: `localhost:3306`
* RabbitMQ: `localhost:5672`
* RabbitMQ Management: `http://localhost:15672`

---

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run start:dev
```

Swagger:

```
http://localhost:3000/api
```

---

### 3. Worker

```bash
cd worker
npm install
npm run start:dev
```

---

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:

```
http://localhost:5173
```

---

## Variáveis de Ambiente

### Backend / Worker

```env
DATABASE_URL="mysql://root:root@localhost:3306/mensageria"
RABBITMQ_URL="amqp://localhost:5672"
```

---

## Endpoints Principais

### Produtos

* `GET /products`
* `POST /products`
* `PUT /products/:id`
* `DELETE /products/:id`

### Pedidos

* `GET /orders`
* `GET /orders/:id`
* `GET /orders/:id/events`
* `POST /orders`

---

## Modelo de Dados

### Product

* id
* name
* description
* price
* stock

### Order

* id
* status
* total
* createdAt
* updatedAt

### OrderItem

* id
* productId
* quantity
* unitPrice
* subtotal

### OrderEvent

* id
* orderId
* status
* message
* createdAt

---

## Status Possíveis do Pedido

```
PENDING
PROCESSING_PAYMENT
APPROVED
REJECTED
```

---

## Aprendizados

Este projeto foi utilizado para praticar:

* Arquitetura Full Stack
* Mensageria assíncrona
* RabbitMQ
* Processamento em background
* Prisma ORM
* React Query
* Formulários com React Hook Form + Zod
* Componentização com Material UI
* Docker e Docker Compose
* Boas práticas de organização de código

---

## Melhorias Futuras

* Filtros por status
* Busca de produtos
* Paginação
* Ordenação de tabelas
* Testes automatizados
* Autenticação JWT
* Deploy em nuvem
* WebSockets para atualização em tempo real

---

## Autor

**Lucas Conceição Lima**

Desenvolvedor Full Stack focado em React, NestJS, SQL, Prisma e automação de processos.
