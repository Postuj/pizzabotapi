import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzaModule } from './pizza/pizza.module';
import { CartModule } from './cart/cart.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [PizzaModule, CartModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
