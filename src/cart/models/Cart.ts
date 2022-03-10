import { Logger } from '@nestjs/common';
import { Pizza } from 'src/pizza/model/Pizza';

export class Cart {
  userId: string;
  items: Array<Item>;

  constructor(userId: string) {
    this.userId = userId;
    this.items = [];
  }

  get isEmpty() {
    return this.items.length < 1;
  }

  reset(): void {
    this.items = [];
  }

  addItem(item: Item): void {
    let existingItem = this.items.find(
      (i) => i.pizza.id == item.pizza.id && i.size == item.size,
    );
    if (existingItem) {
      Logger.log('Item exists, summing');
      existingItem.quantity = +existingItem.quantity;
      existingItem.quantity += +item.quantity;
    } else {
      this.items.push(item);
    }
  }

  getCartCheckoutText(): string {
    let sum = 0;
    this.items.forEach((i) => {
      sum += i.quantity * i.price;
    });
    let finalString = 'Your order:\n';
    this.items.forEach((i) => {
      finalString += `${i.quantity} x ${i.size[0]} ${i.pizza.name}: ${
        i.quantity * i.pizza.prices.find((p) => p.size == i.size).price
      } zł\n`;
    });
    finalString += `\nTotal: ${sum} zł\n`;
    return finalString;
  }
}

export type Item = {
  pizza: Pizza;
  size: string;
  price: number;
  quantity: number;
};
