import { PartialType } from '@nestjs/mapped-types';
import { OrderPizzaDto } from './order-pizza.dto';

export class UpdatePizzaDto extends PartialType(OrderPizzaDto) {}
