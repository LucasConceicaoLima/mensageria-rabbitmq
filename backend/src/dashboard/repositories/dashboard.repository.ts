import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getKPIs() {
        const [orders, items, approvedOrders, rejectedOrders, completedOrders] =
            await Promise.all([
                this.prisma.order.aggregate({
                    _count: true,
                    _sum: {
                        total: true,
                    },
                    _avg: {
                        total: true,
                    },
                }),

                this.prisma.orderItem.aggregate({
                    _sum: {
                        quantity: true,
                    },
                }),

                this.prisma.order.count({
                    where: {
                        status: 'APPROVED',
                    },
                }),

                this.prisma.order.count({
                    where: {
                        status: 'REJECTED',
                    },
                }),

                this.prisma.order.findMany({
                    where: {
                        approvedAt: {
                            not: null,
                        },
                    },
                    select: {
                        createdAt: true,
                        approvedAt: true,
                    },
                }),
            ]);

        const totalOrders = orders._count;

        const averageProcessingTime =
            completedOrders.length === 0
                ? 0
                : completedOrders.reduce((acc, order) => {
                    const minutes =
                        (order.approvedAt!.getTime() - order.createdAt.getTime()) /
                        60000;

                    return acc + minutes;
                }, 0) / completedOrders.length;

        return {
            totalOrders,

            totalRevenue: Number(
                orders._sum.total ?? new Prisma.Decimal(0),
            ),

            averageTicket: Number(
                orders._avg.total ?? new Prisma.Decimal(0),
            ),

            productsSold: items._sum.quantity ?? 0,

            approvalRate:
                totalOrders === 0
                    ? 0
                    : Number(
                        ((approvedOrders / totalOrders) * 100).toFixed(1),
                    ),

            rejectionRate:
                totalOrders === 0
                    ? 0
                    : Number(
                        ((rejectedOrders / totalOrders) * 100).toFixed(1),
                    ),

            averageProcessingTime: Number(
                averageProcessingTime.toFixed(1),
            ),
        };
    }

    async getStatusSummary() {
        const status = await this.prisma.order.groupBy({
            by: ['status'],
            _count: true,
        });

        return {
            pending:
                status.find((s) => s.status === 'PENDING')?._count ?? 0,

            processing:
                status.find((s) => s.status === 'PROCESSING_PAYMENT')?._count ?? 0,

            approved:
                status.find((s) => s.status === 'APPROVED')?._count ?? 0,

            rejected:
                status.find((s) => s.status === 'REJECTED')?._count ?? 0,
        };
    }

    async getLatestOrders() {
        return this.prisma.order.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
            select: {
                id: true,
                status: true,
                total: true,
                createdAt: true,
            },
        });
    }

    async getTopProducts() {
        const ranking = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 5,
        });

        const productIds = ranking.map((item) => item.productId);

        const products = await this.prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                name: true,
            },
        });

        return ranking.map((item) => ({
            productId: item.productId,
            productName:
                products.find((p) => p.id === item.productId)?.name ??
                'Unknown',
            quantitySold: item._sum.quantity ?? 0,
        }));
    }

    async getRevenueTimeline() {
        const orders = await this.prisma.order.findMany({
            where: {
                approvedAt: {
                    not: null,
                },
            },
            select: {
                approvedAt: true,
                total: true,
            },
            orderBy: {
                approvedAt: 'asc',
            },
        });

        const grouped = new Map<string, number>();

        for (const order of orders) {
            if (!order.approvedAt) {
                continue;
            }

            const day = order.approvedAt.toISOString().split('T')[0];

            grouped.set(
                day,
                (grouped.get(day) ?? 0) + Number(order.total),
            );
        }

        return [...grouped.entries()].map(([date, revenue]) => ({
            date,
            revenue: Number(revenue.toFixed(2)),
        }));
    }

    async getOrdersTimeline() {
        const orders = await this.prisma.order.findMany({
            select: {
                createdAt: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        const grouped = new Map<string, number>();

        for (const order of orders) {
            const day = order.createdAt
                .toISOString()
                .split('T')[0];

            grouped.set(day, (grouped.get(day) ?? 0) + 1);
        }

        return [...grouped.entries()].map(([date, orders]) => ({
            date,
            orders,
        }));
    }
}