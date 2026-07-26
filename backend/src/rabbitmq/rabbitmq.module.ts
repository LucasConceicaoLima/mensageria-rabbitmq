import { Global, Module } from '@nestjs/common';
import { RabbitMQController } from './rabbitmq.controller';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
