import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';
import { CartModule } from 'src/cart/cart.module';
import { CartService } from 'src/cart/cart.service';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [PizzaController],
  providers: [PizzaService, CartService, MessageService],
})
export class PizzaModule {}
