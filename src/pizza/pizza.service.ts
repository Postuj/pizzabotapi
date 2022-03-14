import { Injectable, Logger } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/models/Message';
import { OrderPizzaDto } from './dto/order-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './model/Pizza';

@Injectable()
export class PizzaService {
  constructor(
    private readonly cartService: CartService,
    private readonly messageService: MessageService,
  ) {}

  cloudFlareUrl = 'https://pizzabotex.herokuapp.com';

  pizzas = [
    new Pizza(0, 'Pepperoni', [
      { size: 'Small', price: 38.5 },
      { size: 'Medium', price: 42.5 },
      { size: 'Large', price: 48.5 },
    ]),
    new Pizza(1, 'Carbonara', [
      { size: 'Small', price: 37.5 },
      { size: 'Medium', price: 41.5 },
      { size: 'Large', price: 47.5 },
    ]),
    new Pizza(2, 'Capricciosa', [
      { size: 'Small', price: 35.5 },
      { size: 'Medium', price: 39.5 },
      { size: 'Large', price: 44.5 },
    ]),
  ];

  createPizzaCart(userId: string) {
    this.cartService.create(userId);
  }

  checkoutUser(userId: string): Message {
    return this.cartService.checkoutUser(userId, this.cloudFlareUrl);
  }

  orderItem(
    userId: string,
    itemId: number,
    size = 'Small',
    quantity = 1,
  ): Message {
    const pizza = this.pizzas.find((p) => p.id == itemId);
    const item = {
      pizza,
      size,
      price: pizza.prices.find((p) => p.size == size).price,
      quantity,
    };
    const cart = this.cartService.addItemToCart(userId, item);

    if (!cart)
      return {
        messages: [{ text: "You don't have cart." }],
      };

    return this.messageService.createButtonMessage(
      `I've added ${quantity} x ${size} ${
        pizza.name
      } to Your cart. ✅\n\n ${cart.getCartCheckoutText()}\nWhat would You like to do next? 🤔`,
      [
        {
          title: 'Continue ordering 🛒',
          type: 'json_plugin_url',
          url: `${this.cloudFlareUrl}/pizza/${userId}`,
        },
        {
          title: 'Go to checkout 🏦',
          type: 'json_plugin_url',
          url: `${this.cloudFlareUrl}/pizza/checkout/${userId}`,
        },
        {
          title: 'Reset cart 🔁',
          type: 'json_plugin_url',
          url: `${this.cloudFlareUrl}/pizza/resetCart/${userId}`,
        },
      ],
    );
  }

  sendPizzaMenu(userId: string): Message {
    return this.messageService.createButtonMessage(
      '⬇️ Select pizza from the menu below. ⬇️',
      this.pizzas.map((p) => p.toResponseButton(userId, this.cloudFlareUrl)),
    );
  }

  sendQuantityMessage(userId: string, itemId: number, size: string): Message {
    return this.messageService.createButtonMessage('How many? 🤔', [
      {
        title: 'One',
        type: 'json_plugin_url',
        url: `${this.cloudFlareUrl}/pizza/order/${userId}/${itemId}/${size}/1`,
      },
      {
        title: 'Two',
        type: 'json_plugin_url',
        url: `${this.cloudFlareUrl}/pizza/order/${userId}/${itemId}/${size}/2`,
      },
      {
        title: 'Three',
        type: 'json_plugin_url',
        url: `${this.cloudFlareUrl}/pizza/order/${userId}/${itemId}/${size}/3`,
      },
    ]);
  }

  sendSizeMessage(userId: string, itemId: number): Message {
    const pizza = this.pizzas.find((p) => p.id == itemId);
    return this.messageService.createButtonMessage(
      'How big? 🍽️',
      pizza.getSizeResponseButtons(userId, this.cloudFlareUrl),
    );
  }

  submitOrder(userId: string): Message {
    return this.cartService.submitUserOrder(userId);
  }

  resetUserCart(userId: string): Message {
    this.cartService.resetCart(userId);
    return this.sendPizzaMenu(userId);
  }
}
