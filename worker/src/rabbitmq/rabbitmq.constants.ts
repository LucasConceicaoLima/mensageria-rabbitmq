export const RABBITMQ_QUEUE = 'order-created-queue';
export const RABBITMQ_RETRY_QUEUE = 'order-created-retry-queue';
export const RABBITMQ_DLQ = 'order-created-dlq';
export const ORDER_CREATED_EVENT = 'order.created';
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 5000;