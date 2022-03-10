import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [CartController],
  providers: [CartService, MessageService],
})
export class CartModule {}
