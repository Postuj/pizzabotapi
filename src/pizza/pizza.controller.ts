import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Message } from 'src/message/models/Message';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Get(':userId')
  getAllPizzas(@Param('userId') userId: string) {
    return this.pizzaService.sendPizzaMenu(userId);
  }

  @Get('createCart/:userId')
  createCart(@Param('userId') userId: string) {
    this.pizzaService.createPizzaCart(userId);
  }

  @Get('select/:userId/:itemId')
  selectPizza(
    @Param('userId') userId: string,
    @Param('itemId') itemId: number,
  ) {
    Logger.log('Selecting pizza');
    return this.pizzaService.sendSizeMessage(userId, itemId);
  }

  @Get('select/:userId/:itemId/:size')
  selectPizzaSize(
    @Param('userId') userId: string,
    @Param('itemId') itemId: number,
    @Param('size') size: string,
  ) {
    return this.pizzaService.sendQuantityMessage(userId, itemId, size);
  }

  @Get('order/:userId/:itemId/:size/:quantity')
  order(
    @Param('userId') userId: string,
    @Param('itemId') itemId: number,
    @Param('size') size: string,
    @Param('quantity') quantity: number,
  ) {
    return this.pizzaService.orderItem(userId, itemId, size, quantity);
  }

  @Get('resetCart/:userId')
  resetCart(@Param('userId') userId: string) {
    return this.pizzaService.resetUserCart(userId);
  }

  @Get('/checkout/:userId')
  checkOut(@Param('userId') userId: string): Message {
    return this.pizzaService.checkoutUser(userId);
  }

  @Get('/submitOrder/:userId')
  submitOrder(@Param('userId') userId: string): Message {
    return this.pizzaService.submitOrder(userId);
  }
}
