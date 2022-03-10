import { MessageButton } from 'src/message/models/Message';

export class Pizza {
  id: number;
  name: string;
  prices: Array<SizePrice>;

  constructor(id: number, name: string, prices: Array<SizePrice>) {
    this.id = id;
    this.name = name;
    this.prices = prices;
  }

  toResponseButton(userId: string, cloudflareUrl: string): MessageButton {
    return {
      title: this.name,
      type: 'json_plugin_url',
      url: `${cloudflareUrl}/pizza/select/${userId}/${this.id}`,
    };
  }

  getSizeResponseButtons(
    userId: string,
    cloudflareUrl: string,
  ): Array<MessageButton> {
    return this.prices.map((p) => ({
      title: `${p.size} (${p.price} zł)`,
      type: 'json_plugin_url',
      url: `${cloudflareUrl}/pizza/select/${userId}/${this.id}/${p.size}`,
    }));
  }
}

export type SizePrice = {
  size: string;
  price: number;
};
