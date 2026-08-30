import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { OrderStatus } from '@prisma/client';

import { PaymentService } from './payment.service';
import { OrdersRepository } from './repositories/orders.repository';

describe('PaymentService', () => {
  let service: PaymentService;
  let repository: jest.Mocked<OrdersRepository>;
  let configService: {
    get: jest.Mock;
  };

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      startPayment: jest.fn(),
      updateStatus: jest.fn(),
      createEvent: jest.fn(),
      findEvents: jest.fn(),
      executeTransaction: jest.fn(),
    } as unknown as jest.Mocked<OrdersRepository>;

    configService = {
      get: jest.fn(),
    };

    service = new PaymentService(repository, configService as any);
  });

  it('should throw NotFoundException when order does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.process('order-123')).rejects.toThrow(
      new NotFoundException('Order order-123 not found.'),
    );

    expect(repository.findById).toHaveBeenCalledWith('order-123');
  });

  it('should not continue processing when order is already being processed', async () => {
    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 500,
    } as any);

    configService.get.mockReturnValue('false');

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    repository.startPayment.mockResolvedValue(false);

    await service.process('order-123');

    expect(repository.startPayment).toHaveBeenCalledWith(
      'order-123',
      expect.anything(),
    );

    expect(repository.updateStatus).not.toHaveBeenCalled();
    expect(repository.createEvent).not.toHaveBeenCalled();
  });

  it('should approve payment when order total is less than or equal to R$ 1,000', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 1000,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    expect(repository.startPayment).toHaveBeenCalledWith(
      'order-123',
      expect.anything(),
    );

    expect(repository.updateStatus).toHaveBeenCalledWith(
      'order-123',
      OrderStatus.APPROVED,
      expect.objectContaining({
        approvedAt: expect.any(Date),
      }),
      expect.anything(),
    );

    expect(repository.createEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        status: OrderStatus.APPROVED,
        message: 'Payment approved.',
      }),
      expect.anything(),
    );

    jest.useRealTimers();
  });

  it('should reject payment when order total is greater than R$ 1,000', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 1000.01,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    expect(repository.startPayment).toHaveBeenCalledWith(
      'order-123',
      expect.anything(),
    );

    expect(repository.updateStatus).toHaveBeenCalledWith(
      'order-123',
      OrderStatus.REJECTED,
      {
        approvedAt: null,
      },
      expect.anything(),
    );

    expect(repository.createEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        status: OrderStatus.REJECTED,
        message: 'Payment rejected.',
      }),
      expect.anything(),
    );

    jest.useRealTimers();
  });

  it('should throw an error when payment error simulation is enabled', async () => {
    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 500,
    } as any);

    configService.get.mockReturnValue('true');

    await expect(service.process('order-123')).rejects.toThrow(
      'Erro simulado para testar retry.',
    );

    expect(repository.executeTransaction).not.toHaveBeenCalled();
  });

  it('should create a processing payment event', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 500,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    expect(repository.createEvent).toHaveBeenCalledWith(
      {
        status: OrderStatus.PROCESSING_PAYMENT,
        message: 'Processing payment.',
        order: {
          connect: {
            id: 'order-123',
          },
        },
      },
      expect.anything(),
    );

    jest.useRealTimers();
  });

  it('should create an approved payment event', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 500,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    expect(repository.createEvent).toHaveBeenCalledWith(
      {
        status: OrderStatus.APPROVED,
        message: 'Payment approved.',
        order: {
          connect: {
            id: 'order-123',
          },
        },
      },
      expect.anything(),
    );

    jest.useRealTimers();
  });

  it('should create a rejected payment event', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 1500,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    expect(repository.createEvent).toHaveBeenCalledWith(
      {
        status: OrderStatus.REJECTED,
        message: 'Payment rejected.',
        order: {
          connect: {
            id: 'order-123',
          },
        },
      },
      expect.anything(),
    );

    jest.useRealTimers();
  });

  it('should process payment in the correct order', async () => {
    jest.useFakeTimers();

    repository.findById.mockResolvedValue({
      id: 'order-123',
      total: 500,
    } as any);

    configService.get.mockReturnValue('false');

    repository.startPayment.mockResolvedValue(true);

    repository.executeTransaction.mockImplementation(async (callback: any) => {
      return callback({});
    });

    const processPromise = service.process('order-123');

    await jest.runAllTimersAsync();

    await processPromise;

    const startPaymentOrder =
      repository.startPayment.mock.invocationCallOrder[0];

    const firstEventOrder = repository.createEvent.mock.invocationCallOrder[0];

    const updateStatusOrder =
      repository.updateStatus.mock.invocationCallOrder[0];

    const secondEventOrder = repository.createEvent.mock.invocationCallOrder[1];

    expect(startPaymentOrder).toBeLessThan(firstEventOrder);

    expect(firstEventOrder).toBeLessThan(updateStatusOrder);

    expect(updateStatusOrder).toBeLessThan(secondEventOrder);

    jest.useRealTimers();
  });
});
