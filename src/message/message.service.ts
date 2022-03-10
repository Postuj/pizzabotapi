import { Injectable } from '@nestjs/common';
import { Message, MessageButton } from './models/Message';

@Injectable()
export class MessageService {
  createButtonMessage(text: string, buttons: Array<MessageButton>): Message {
    return {
      messages: [
        {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: text,
              buttons: buttons,
            },
          },
        },
      ],
    };
  }

  createBlockRedirectMessage(text: string, blocks: Array<string>): Message {
    return {
      redirect_to_blocks: blocks,
      messages: [
        {
          text: text,
        },
      ],
    };
  }
}
