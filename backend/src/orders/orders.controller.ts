import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrdersService } from './orders.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { OrderEventResponseDto } from './dto/order-event-response.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ResponseMessage('Order created successfully.')
  @ApiOperation({
    summary: 'Create a new order',
  })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: OrderResponseDto,
  })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Post('dlq/reprocess')
  @ResponseMessage('DLQ message reprocessed successfully.')
  @ApiOperation({
    summary: 'Reprocess one message from the DLQ',
  })
  @ApiOkResponse({
    description: 'Message reprocessed successfully.',
  })
  reprocessDlq() {
    return this.ordersService.reprocessDlq();
  }

  @Get()
  @ResponseMessage('Orders retrieved successfully.')
  @ApiOperation({
    summary: 'Get all orders',
  })
  @ApiOkResponse({
    description: 'List of orders.',
    type: OrderResponseDto,
    isArray: true,
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Order retrieved successfully.')
  @ApiOperation({
    summary: 'Get an order by id',
  })
  @ApiOkResponse({
    description: 'Order found.',
    type: OrderResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Get(':id/events')
  @ResponseMessage('Order events retrieved successfully.')
  @ApiOperation({
    summary: 'Get order timeline',
  })
  @ApiOkResponse({
    type: OrderEventResponseDto,
    isArray: true,
  })
  findEvents(@Param('id') id: string) {
    return this.ordersService.findEvents(id);
  }
}
