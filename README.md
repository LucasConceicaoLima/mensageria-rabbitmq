# Mensageria - E-commerce Assíncrono com RabbitMQ

Projeto Full Stack desenvolvido para demonstrar processamento assíncrono de pedidos utilizando **RabbitMQ**, com frontend em **React**, backend em **NestJS**, Worker separado e persistência em **MySQL** via **Prisma ORM**.

## Objetivo

Simular o fluxo de um pequeno e-commerce onde um pedido é criado pela API, persistido no banco de dados, enviado para uma fila RabbitMQ e processado de forma assíncrona por um Worker separado.

O projeto também demonstra conceitos importantes de sistemas distribuídos, como:

- processamento assíncrono;
- confirmação de mensagens (`ack`);
- reprocessamento automático;
- retry com limite de tentativas;
- Dead Letter Queue (DLQ);
- reprocessamento manual de mensagens da DLQ;
- idempotência no processamento;
- atualização automática da interface;
- separação entre API e Worker.

---

## Arquitetura

```text
                         +----------------+
                         |    Frontend    |
                         | React + MUI    |
                         +-------+--------+
                                 |
                                 v
                         +----------------+
                         |  Backend API   |
                         |    NestJS      |
                         +-------+--------+
                                 |
                    +------------+------------+
                    |                         |
                    v                         v
             +-------------+          +---------------+
             |    MySQL    |          |   RabbitMQ    |
             |   Prisma    |          |               |
             +-------------+          | order-created |
                                      |    queue      |
                                      +-------+-------+
                                              |
                                              v
                                      +---------------+
                                      |    Worker     |
                                      |    NestJS     |
                                      +-------+-------+
                                              |
                                              v
                                      +---------------+
                                      |    MySQL      |
                                      | Update Order  |
                                      +---------------+

                         Falhas após retries
                                  |
                                  v
                         +----------------+
                         |      DLQ       |
                         | order-created-  |
                         |      dlq       |
                         +-------+--------+
                                 |
                    Reprocessamento manual
                                 |
                                 v
                         +----------------+
                         |  Backend API   |
                         +----------------+
```

---

## Tecnologias Utilizadas

### Frontend

- React + TypeScript
- React Query (TanStack Query)
- React Hook Form
- Zod
- Material UI (MUI)
- MUI X Charts
- React Router DOM

### Backend

- NestJS
- Prisma ORM
- MySQL
- Swagger/OpenAPI
- RabbitMQ (`amqplib`)

### Worker

- NestJS
- RabbitMQ (`amqplib`)
- Prisma ORM
- MySQL

### Infraestrutura

- Docker
- Docker Compose
- RabbitMQ Management

---

## Funcionalidades

### Produtos

- Criar produto
- Editar produto
- Excluir produto
- Listar produtos
- Pesquisa de produtos
- Ordenação e paginação
- Validação de formulário com Zod
- Feedback com Snackbar
- Skeletons de carregamento
- Tratamento de estados de erro

### Pedidos

- Criar pedido
- Listar pedidos
- Visualizar detalhes do pedido
- Timeline de eventos
- Processamento assíncrono do pagamento
- Atualização automática do status
- Proteção contra processamento duplicado
- Reprocessamento de mensagens da DLQ

### Dashboard

- Total de pedidos
- Receita
- Ticket Médio
- Produtos Vendidos
- Taxa de Aprovação
- Taxa de Rejeição
- Tempo Médio de Processamento
- Pedidos - Distribuição por status
- Pedidos - Pedidos ao longo do período
- Receita - Receita ao longo do período
- Últimos Pedidos
- Produtos mais vendidos

### UX

- Skeletons de carregamento
- Estados de loading
- Estados de erro
- Snackbar reutilizável
- Pesquisa
- Interface responsiva
- Atualização automática de dados com React Query

---

## Fluxo de Processamento

### Fluxo normal

1. Usuário cria um pedido pelo frontend.
2. A API valida os produtos e o estoque.
3. O pedido é salvo no MySQL com status `PENDING`.
4. O estoque dos produtos é atualizado dentro da mesma transação.
5. A API publica uma mensagem na fila `order-created-queue`.
6. O Worker consome a mensagem.
7. O Worker verifica se o pedido já foi processado.
8. O pedido é atualizado para `PROCESSING_PAYMENT`.
9. Um evento é registrado na timeline.
10. O Worker simula o processamento do pagamento.
11. O pedido é atualizado para `APPROVED` ou `REJECTED`.
12. Um novo evento é registrado na timeline.
13. O frontend consulta automaticamente o pedido para refletir a alteração.

---

## Retry e Dead Letter Queue

O Worker possui mecanismo de retry para mensagens que falham durante o processamento.

Quando ocorre uma falha:

```text
order-created-queue
        |
        v
    processamento
        |
      erro
        |
        v
   retry queue
        |
    aguarda delay
        |
        v
order-created-queue
```

O sistema permite até **3 tentativas** de processamento.

Caso a mensagem continue falhando após o limite:

```text
order-created-queue
        |
        v
      erro
        |
        v
     Retry 1
        |
      erro
        |
        v
     Retry 2
        |
      erro
        |
        v
     Retry 3
        |
      erro
        |
        v
       DLQ
```

A mensagem é então encaminhada para a:

```text
order-created-dlq
```

Isso evita que uma mensagem com falha permanente fique sendo processada indefinidamente.

---

## Reprocessamento da DLQ

Mensagens que chegaram à Dead Letter Queue podem ser reprocessadas manualmente através do Backend.

O Backend possui uma operação específica para:

1. buscar uma mensagem disponível na DLQ;
2. removê-la da DLQ;
3. republicá-la na fila principal;
4. permitir que o Worker processe novamente a mensagem.

Fluxo:

```text
DLQ
 |
 | Reprocessar
 v
Backend API
 |
 v
order-created-queue
 |
 v
Worker
```

O reprocessamento é separado do consumidor normal do Worker para evitar que a DLQ seja tratada como uma fila de consumo convencional.

---

## Idempotência

O Worker possui uma proteção contra processamento duplicado.

Antes de processar um pedido, o `PaymentService` verifica o estado atual do pedido.

Caso o pedido já esteja sendo processado ou tenha sido finalizado, o Worker não executa novamente o fluxo de pagamento.

Isso é importante em sistemas com mensageria porque uma mensagem pode eventualmente ser entregue mais de uma vez.

Exemplo:

```text
Mensagem
   |
   v
Worker
   |
   v
Pedido já processado?
   |
  SIM
   |
   v
Ignora processamento
```

Essa proteção evita efeitos duplicados, como:

- processamento de pagamento repetido;
- atualização indevida do status;
- criação desnecessária de eventos.

---

## Confirmação de Mensagens

O Worker utiliza confirmação explícita das mensagens:

```text
Processamento concluído
        |
        v
       ACK
```

Se o processamento falhar:

```text
Processamento falhou
        |
        v
      NACK
        |
        v
      Retry
```

A mensagem só é confirmada após o processamento bem-sucedido.

---

## RabbitMQ

A fila principal utilizada pelo projeto é:

```text
order-created-queue
```

A Dead Letter Queue é:

```text
order-created-dlq
```

O evento publicado possui o formato conceitual:

```json
{
  "event": "order.created",
  "orderId": "order-id",
  "total": 150.00
}
```

As mensagens são publicadas como persistentes e as filas são configuradas como duráveis.

---

## Atualização Automática

O frontend utiliza **TanStack Query** para manter os dados atualizados.

Na tela de detalhes do pedido, o pedido é consultado periodicamente para acompanhar a transição:

```text
PENDING
   |
   v
PROCESSING_PAYMENT
   |
   v
APPROVED / REJECTED
```

Isso permite visualizar o resultado do processamento assíncrono sem precisar atualizar a página manualmente.

---

## Tratamento de Erros

O projeto possui tratamento de erros em diferentes camadas.

### Backend

- Validação de existência de produtos
- Validação de estoque
- Pedido inexistente
- Erros de processamento
- Tratamento de falhas de RabbitMQ

### Worker

- Tratamento de exceções durante o processamento
- Retry automático
- Limite de tentativas
- Encaminhamento para DLQ
- Logs de processamento
- Proteção contra processamento duplicado

### Frontend

- Estados de loading
- Skeletons
- Estados de erro
- Botão de retry
- Snackbar para feedback de operações

---

## Estrutura do Projeto

```text
Mensageria/
├── frontend/
├── backend/
├── worker/
└── docker-compose.yml
```

A aplicação é organizada em três responsabilidades principais:

### Frontend

Responsável pela interface, interação do usuário e visualização dos dados.

### Backend

Responsável pela API, regras relacionadas à criação dos pedidos, persistência e comunicação com RabbitMQ.

### Worker

Responsável pelo processamento assíncrono das mensagens e simulação do processamento de pagamento.

---

## Como Executar

### 1. Subir infraestrutura

```bash
docker compose up -d
```

Serviços disponíveis:

- MySQL: `localhost:3306`
- RabbitMQ: `localhost:5672`
- RabbitMQ Management: `http://localhost:15672`

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

### Backend / Worker

```env
DATABASE_URL="mysql://root:root@localhost:3306/mensageria"
RABBITMQ_URL="amqp://localhost:5672"
```

---

## Endpoints Principais

### Produtos

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Pedidos

- `GET /orders`
- `GET /orders/:id`
- `GET /orders/:id/events`
- `POST /orders`

### Mensageria

Além dos endpoints relacionados aos pedidos, o Backend possui uma operação específica para reprocessamento de mensagens da DLQ.

---

## Modelo de Dados

### Product

- id
- name
- description
- price
- stock

### Order

- id
- status
- total
- createdAt
- updatedAt

### OrderItem

- id
- productId
- quantity
- unitPrice
- subtotal

### OrderEvent

- id
- orderId
- status
- message
- createdAt

---

## Status Possíveis do Pedido

```text
PENDING
PROCESSING_PAYMENT
APPROVED
REJECTED
```

---

## Observabilidade

O projeto utiliza logs estruturados por contexto para acompanhar o fluxo de uma mensagem entre Backend, RabbitMQ e Worker.

Exemplo:

```text
[Backend]
Message published to "order-created-queue"

[Worker]
Received order <id>

[Worker]
Order <id> is now PROCESSING_PAYMENT.

[Worker]
Order <id> finished with status APPROVED.
```

Em cenários de falha:

```text
Error processing message
Message sent to retry queue. Attempt 1/3.
Message sent to retry queue. Attempt 2/3.
Message sent to retry queue. Attempt 3/3.
Message exceeded maximum retries (3).
```

Esses logs facilitam a identificação do caminho percorrido por uma mensagem e a investigação de falhas no processamento assíncrono.

---

## Aprendizados

Este projeto foi utilizado para praticar:

- Arquitetura Full Stack
- Arquitetura com Backend e Worker separados
- Mensageria assíncrona
- RabbitMQ
- Filas duráveis
- Mensagens persistentes
- ACK e NACK
- Retry automático
- Dead Letter Queue
- Reprocessamento manual de mensagens
- Idempotência
- Processamento em background
- Prisma ORM
- Transações com Prisma
- React Query
- Formulários com React Hook Form + Zod
- Componentização com Material UI
- Docker e Docker Compose
- Swagger/OpenAPI
- Tratamento de erros
- Observabilidade através de logs
- Boas práticas de organização de código
- Lint

---

## Melhorias Futuras

- Testes automatizados
- Autenticação JWT
- WebSockets para atualização em tempo real
- Métricas e monitoramento
- Deploy em nuvem
- CI/CD
- Integração com um gateway de pagamento real
- Event-driven architecture mais completa
- Testes de carga e resiliência

---

## Autor

**Lucas Conceição Lima**

Desenvolvedor Full Stack focado em React, NestJS, TypeScript, SQL, Prisma e automação de processos.
