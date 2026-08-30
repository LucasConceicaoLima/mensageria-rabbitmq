# Mensageria — E-commerce Assíncrono com RabbitMQ

Projeto Full Stack desenvolvido para demonstrar **processamento assíncrono de pedidos** utilizando RabbitMQ, com frontend em React, backend em NestJS, Worker separado para processamento e persistência em MySQL via Prisma ORM.

O projeto simula um pequeno e-commerce no qual o processamento do pagamento acontece de forma assíncrona, utilizando **filas, retry, Dead Letter Queue (DLQ) e controle de concorrência**.

---

## Objetivo

Demonstrar, de forma prática, como implementar uma arquitetura baseada em mensageria para processamento assíncrono.

O fluxo principal consiste em:

```text
Frontend
   ↓
Backend API
   ↓
MySQL
   ↓
RabbitMQ
   ↓
Worker
   ↓
Processamento do pagamento
   ↓
MySQL
```

A API é responsável pela criação do pedido, enquanto o Worker processa o pagamento de forma independente.

---

## Arquitetura

```text
                    ┌──────────────┐
                    │   Frontend   │
                    │    React     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Backend API │
                    │   NestJS     │
                    └──────┬───────┘
                           │
                    ┌──────┴───────┐
                    ▼              ▼
              ┌──────────┐   ┌─────────────┐
              │  MySQL   │   │  RabbitMQ   │
              │  Prisma  │   │    Queue    │
              └──────────┘   └──────┬──────┘
                                    │
                                    ▼
                             ┌──────────────┐
                             │    Worker    │
                             │   NestJS     │
                             └──────┬───────┘
                                    │
                                    ▼
                              Atualização
                              do Pedido
```

### Componentes

- **Frontend:** interface do e-commerce e dashboard.
- **Backend:** criação e consulta de produtos e pedidos.
- **RabbitMQ:** transporte das mensagens entre API e Worker.
- **Worker:** processamento assíncrono do pagamento.
- **MySQL:** persistência dos pedidos, produtos e eventos.
- **Prisma:** ORM utilizado para acesso ao banco.

---

## Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- TanStack React Query
- React Hook Form
- Zod
- Material UI (MUI)
- MUI X Charts
- React Router DOM

### Backend

- NestJS
- TypeScript
- Prisma ORM
- MySQL
- Swagger / OpenAPI
- RabbitMQ
- amqplib

### Worker

- NestJS
- TypeScript
- Prisma ORM
- RabbitMQ
- amqplib
- Jest

### Infraestrutura

- Docker
- Docker Compose
- MySQL
- RabbitMQ
- RabbitMQ Management

---

## Funcionalidades

### Produtos

- Criar produto
- Editar produto
- Excluir produto
- Listar produtos
- Validação de formulários com Zod
- Feedback através de Snackbar

### Pedidos

- Criar pedido
- Listar pedidos
- Visualizar detalhes do pedido
- Visualizar timeline de eventos
- Processamento assíncrono do pagamento
- Atualização automática do status pelo Worker

### Dashboard

- Total de pedidos
- Receita
- Ticket médio
- Produtos vendidos
- Taxa de aprovação
- Taxa de rejeição
- Tempo médio de processamento
- Distribuição de pedidos por status
- Pedidos ao longo do período
- Receita ao longo do período
- Últimos pedidos
- Produtos mais vendidos

### UX

- Skeletons de carregamento
- Estados de loading
- Snackbar reutilizável
- Interface responsiva

---

## Fluxo de Processamento

1. O usuário cria um pedido pelo frontend.
2. A API valida os produtos e o estoque.
3. A API cria o pedido com status `PENDING`.
4. A API publica uma mensagem na fila `order-created-queue`.
5. O Worker consome a mensagem.
6. O Worker inicia o processamento do pagamento.
7. O pedido passa para `PROCESSING_PAYMENT`.
8. O pagamento é simulado.
9. Pedidos de até R$ 1.000 são aprovados.
10. Pedidos acima de R$ 1.000 são rejeitados.
11. O status final é persistido no banco.
12. Um evento é registrado na timeline do pedido.
13. O Dashboard passa a refletir o novo status.

---

## Retry e Dead Letter Queue

O Worker possui tratamento de falhas utilizando RabbitMQ.

Quando ocorre um erro durante o processamento:

```text
Worker
   │
   │ erro
   ▼
Retry Queue
   │
   │ TTL
   ▼
Main Queue
   │
   ▼
Worker
```

A quantidade de tentativas é controlada através do header:

```text
x-retry-count
```

Quando o número máximo de tentativas é atingido, a mensagem é encaminhada para uma **Dead Letter Queue (DLQ)**:

```text
Main Queue
    │
    │ erro
    ▼
Retry Queue
    │
    │ novas tentativas
    ▼
Main Queue
    │
    │ limite atingido
    ▼
DLQ
```

Esse mecanismo evita que mensagens que falham continuamente permaneçam sendo processadas indefinidamente.

---

## Controle de Concorrência

O início do processamento do pagamento utiliza uma atualização condicional:

```text
status = PENDING
```

O pedido somente é alterado para `PROCESSING_PAYMENT` se ainda estiver nesse estado.

Isso evita que duas execuções processem o mesmo pedido simultaneamente.

Caso o pedido já tenha sido processado ou esteja sendo processado, o Worker encerra a execução sem realizar um novo processamento.

---

## Transações

Operações relacionadas à alteração do estado do pedido e criação de eventos são executadas dentro de transações utilizando Prisma.

Exemplo conceitual:

```text
BEGIN TRANSACTION

Atualizar status
       +
Criar evento

COMMIT
```

Dessa forma, as alterações relacionadas ao processamento permanecem consistentes.

---

## Testes Automatizados

O Worker possui testes unitários utilizando Jest.

### PaymentService

**9 testes passando**

Os testes cobrem:

- Pedido inexistente
- Pedido já processado
- Aprovação de pagamento
- Rejeição de pagamento
- Simulação de erro
- Criação do evento `PROCESSING_PAYMENT`
- Criação do evento `APPROVED`
- Criação do evento `REJECTED`
- Atualização do status final

### RabbitMQService

**8 testes passando**

Os testes cobrem:

- URL do RabbitMQ não configurada
- Publicação de mensagens
- ACK após processamento bem-sucedido
- Envio para retry após erro
- Incremento do contador de retry
- Envio para DLQ após atingir o limite
- Fechamento das conexões
- Tratamento de mensagens com JSON inválido

### Resultado atual

```text
Test Suites: 2 passed
Tests:       17 passed
```

Os testes não dependem de um banco MySQL ou de uma instância real do RabbitMQ, utilizando mocks para isolar as responsabilidades dos serviços.

---

## Estrutura do Projeto

```text
Mensageria/
│
├── frontend/
│
├── backend/
│
├── worker/
│
└── docker-compose.yml
```

---

## Como Executar

### 1. Subir a infraestrutura

Na raiz do projeto:

```bash
docker compose up -d
```

Serviços:

```text
MySQL                  localhost:3306
RabbitMQ               localhost:5672
RabbitMQ Management    localhost:15672
```

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

```text
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

```text
http://localhost:5173
```

---

## Variáveis de Ambiente

Backend e Worker utilizam as seguintes configurações:

```env
DATABASE_URL="mysql://root:root@localhost:3306/mensageria"
RABBITMQ_URL="amqp://localhost:5672"
```

O Worker também possui uma configuração para simular falhas no processamento:

```env
SIMULATE_PAYMENT_ERROR=false
```

Quando habilitada:

```env
SIMULATE_PAYMENT_ERROR=true
```

o processamento gera um erro propositalmente, permitindo testar o mecanismo de retry do RabbitMQ.

---

## Endpoints Principais

### Produtos

```text
GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id
```

### Pedidos

```text
GET    /orders
GET    /orders/:id
GET    /orders/:id/events
POST   /orders
```

---

## Modelo de Dados

### Product

```text
id
name
description
price
stock
```

### Order

```text
id
status
total
createdAt
updatedAt
```

### OrderItem

```text
id
productId
quantity
unitPrice
subtotal
```

### OrderEvent

```text
id
orderId
status
message
createdAt
```

---

## Status do Pedido

```text
PENDING
    ↓
PROCESSING_PAYMENT
    ↓
APPROVED / REJECTED
```

### `PENDING`

Pedido criado e aguardando processamento.

### `PROCESSING_PAYMENT`

Worker iniciou o processamento do pagamento.

### `APPROVED`

Pagamento aprovado.

### `REJECTED`

Pagamento rejeitado.

---

## Aprendizados

Este projeto foi desenvolvido para praticar e consolidar conhecimentos em:

- Arquitetura Full Stack
- Arquitetura assíncrona
- Mensageria
- RabbitMQ
- Retry e Dead Letter Queue
- Processamento em background
- Controle de concorrência
- Transações
- Prisma ORM
- MySQL
- NestJS
- React
- TanStack React Query
- React Hook Form
- Zod
- Material UI
- Docker e Docker Compose
- Testes automatizados com Jest
- Organização e separação de responsabilidades

---

## Autor

**Lucas Conceição Lima**

Desenvolvedor Full Stack com foco em React, NestJS, TypeScript, SQL, Prisma e automação de processos.