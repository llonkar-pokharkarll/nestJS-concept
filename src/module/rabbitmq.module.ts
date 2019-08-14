import { Module } from '@nestjs/common';

import { RabbitMQService } from '../service/rebiitmq.service';

@Module({
  imports: [RabbitMQService],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule { }
