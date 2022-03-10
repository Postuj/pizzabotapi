import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/models/Message';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, Item } from './models/Cart';

@Injectable()
export class CartService {
  carts: Array<Cart>;

  constructor(private readonly messageService: MessageService) {
    this.carts = [];
  }

  getCartByUserId(userId: string): Cart | null {
    return this.carts.find((c) => c.userId == userId);
  }

  addItemToCart(userId: string, item: Item): Cart {
    Logger.log('Attempting to add item');
    const cart = this.getCartByUserId(userId);
    if (!cart) return null;
    Logger.log(
      `Adding ${item.quantity} x ${item.size} ${item.pizza.name} to cart`,
    );
    cart.addItem(item);
    return cart;
  }

  resetCart(userId: string): void {
    const cart = this.getCartByUserId(userId);
    if (!cart) return;
    Logger.log('Reseting cart');
    cart.reset();
  }

  create(userId: string) {
    if (!this.carts) this.carts = [];
    let cart = this.carts.find((c) => c.userId);
    if (cart) {
      Logger.log('Cart exists');
      // cart.reset();
    } else {
      Logger.log(`Creating cart for ${userId}`);
      this.carts.push(new Cart(userId));
    }
  }

  checkoutUser(userId: string, cloudFlareUrl: string): Message {
    let cart = this.carts.find((c) => c.userId);
    if (!cart)
      return {
        messages: [{ text: "We couldn't checkout You. 😭" }],
      };
    return this.messageService.createButtonMessage(
      cart.getCartCheckoutText() + '\nIs everything correct 🤔?',
      [
        {
          title: 'Yes, submit ✅',
          type: 'json_plugin_url',
          url: `${cloudFlareUrl}/pizza/submitOrder/${userId}`,
        },
        {
          title: 'Continue ordering 🛒',
          type: 'json_plugin_url',
          url: `${cloudFlareUrl}/pizza/${userId}`,
        },
        {
          title: 'Cancel order ❌',
          type: 'json_plugin_url',
          url: `${cloudFlareUrl}/pizza/resetCart/${userId}`,
        },
      ],
    );
  }

  submitUserOrder(userId: string): Message {
    const cart = this.getCartByUserId(userId);
    if (!cart)
      return {
        messages: [{ text: "Couldn't proceed with payment 😭" }],
      };

    if (cart.isEmpty)
      return {
        messages: [{ text: 'Cart is empty 😱' }],
      };

    const msg = this.messageService.createBlockRedirectMessage(
      `Great 🍾, your order has been successfully submitted. 😍\n\n${cart.getCartCheckoutText()}`,
      ['orderSubmitted'],
    );
    cart.reset();

    return msg;
  }
}
