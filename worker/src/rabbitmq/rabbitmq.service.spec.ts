import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { RabbitMQService } from './rabbitmq.service';
import { MAX_RETRIES, RABBITMQ_DLQ } from './rabbitmq.constants';

describe('RabbitMQService', () => {
  let service: RabbitMQService;
  let configService: {
    get: jest.Mock;
  };

  beforeEach(() => {
    configService = {
      get: jest.fn(),
    };

    service = new RabbitMQService(configService as any);
  });

  it('should throw an error when RABBITMQ_URL is not configured', async () => {
    configService.get.mockReturnValue(undefined);

    await expect(service.onModuleInit()).rejects.toThrow(
      'RABBITMQ_URL not configured.',
    );
  });

  it('should publish a message to the specified queue', () => {
    const sendToQueue = jest.fn().mockReturnValue(true);

    (service as any).channel = {
      sendToQueue,
    };

    const message = {
      orderId: 'order-123',
    };

    const result = service.publish('orders', message);

    expect(result).toBe(true);

    expect(sendToQueue).toHaveBeenCalledWith(
      'orders',
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );
  });

  it('should acknowledge the message when callback succeeds', async () => {
    const ack = jest.fn();

    const callback = jest.fn(async (_message: unknown): Promise<void> => {
      return;
    });

    const message = {
      content: Buffer.from(
        JSON.stringify({
          orderId: 'order-123',
        }),
      ),
      properties: {
        headers: {},
      },
    };

    const consume = jest.fn(
      async (
        _queue: string,
        handler: (msg: typeof message) => void,
      ): Promise<void> => {
        handler(message);
      },
    );

    (service as any).channel = {
      consume,
      ack,
    };

    await service.consume('orders', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(consume).toHaveBeenCalledWith('orders', expect.any(Function));

    expect(callback).toHaveBeenCalledWith({
      orderId: 'order-123',
    });

    expect(ack).toHaveBeenCalledWith(message);
  });

  it('should send the message to the retry queue when callback fails', async () => {
    const ack = jest.fn();
    const sendToQueue = jest.fn();

    const callback = jest.fn(async (_message: unknown): Promise<void> => {
      throw new Error('Processing error');
    });

    const message = {
      content: Buffer.from(
        JSON.stringify({
          orderId: 'order-123',
        }),
      ),
      properties: {
        headers: {},
      },
    };

    const consume = jest.fn(
      async (
        _queue: string,
        handler: (msg: typeof message) => void,
      ): Promise<void> => {
        handler(message);
      },
    );

    (service as any).channel = {
      consume,
      ack,
      sendToQueue,
    };

    await service.consume('orders', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(callback).toHaveBeenCalledWith({
      orderId: 'order-123',
    });

    expect(sendToQueue).toHaveBeenCalledWith(
      expect.any(String),
      message.content,
      expect.objectContaining({
        persistent: true,
        headers: expect.objectContaining({
          'x-retry-count': 1,
        }),
      }),
    );

    expect(ack).toHaveBeenCalledWith(message);
  });

  it('should increment the retry count when retrying a message', async () => {
    const ack = jest.fn();
    const sendToQueue = jest.fn();

    const callback = jest.fn(async (_message: unknown): Promise<void> => {
      throw new Error('Processing error');
    });

    const message = {
      content: Buffer.from(
        JSON.stringify({
          orderId: 'order-123',
        }),
      ),
      properties: {
        headers: {
          'x-retry-count': 2,
        },
      },
    };

    const consume = jest.fn(
      async (
        _queue: string,
        handler: (msg: typeof message) => void,
      ): Promise<void> => {
        handler(message);
      },
    );

    (service as any).channel = {
      consume,
      ack,
      sendToQueue,
    };

    await service.consume('orders', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(sendToQueue).toHaveBeenCalledWith(
      expect.any(String),
      message.content,
      expect.objectContaining({
        persistent: true,
        headers: expect.objectContaining({
          'x-retry-count': 3,
        }),
      }),
    );

    expect(ack).toHaveBeenCalledWith(message);
  });

  it('should send the message to the DLQ when max retries is reached', async () => {
    const ack = jest.fn();
    const sendToQueue = jest.fn();

    const callback = jest.fn(async (_message: unknown): Promise<void> => {
      throw new Error('Processing error');
    });

    const message = {
      content: Buffer.from(
        JSON.stringify({
          orderId: 'order-123',
        }),
      ),
      properties: {
        headers: {
          'x-retry-count': MAX_RETRIES,
        },
      },
    };

    const consume = jest.fn(
      async (
        _queue: string,
        handler: (msg: typeof message) => void,
      ): Promise<void> => {
        handler(message);
      },
    );

    (service as any).channel = {
      consume,
      ack,
      sendToQueue,
    };

    await service.consume('orders', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(sendToQueue).toHaveBeenCalledWith(RABBITMQ_DLQ, message.content, {
      persistent: true,
      headers: expect.objectContaining({
        'x-retry-count': MAX_RETRIES,
      }),
    });

    expect(ack).toHaveBeenCalledWith(message);
  });

  it('should close the channel and connection on module destroy', async () => {
    const channelClose = jest.fn(async (): Promise<void> => {
      return;
    });

    const connectionClose = jest.fn(async (): Promise<void> => {
      return;
    });

    (service as any).channel = {
      close: channelClose,
    };

    (service as any).connection = {
      close: connectionClose,
    };

    await service.onModuleDestroy();

    expect(channelClose).toHaveBeenCalled();
    expect(connectionClose).toHaveBeenCalled();
  });

  it('should send an invalid message to the retry queue when JSON parsing fails', async () => {
    const ack = jest.fn();
    const sendToQueue = jest.fn();

    const callback = jest.fn(async (_message: unknown): Promise<void> => {
      return;
    });

    const message = {
      content: Buffer.from('invalid-json'),
      properties: {
        headers: {},
      },
    };

    const consume = jest.fn(
      async (
        _queue: string,
        handler: (msg: typeof message) => void,
      ): Promise<void> => {
        handler(message);
      },
    );

    (service as any).channel = {
      consume,
      ack,
      sendToQueue,
    };

    await service.consume('orders', callback);

    await new Promise((resolve) => setImmediate(resolve));

    expect(callback).not.toHaveBeenCalled();

    expect(sendToQueue).toHaveBeenCalledWith(
      expect.any(String),
      message.content,
      expect.objectContaining({
        persistent: true,
        headers: expect.objectContaining({
          'x-retry-count': 1,
        }),
      }),
    );

    expect(ack).toHaveBeenCalledWith(message);
  });
});
