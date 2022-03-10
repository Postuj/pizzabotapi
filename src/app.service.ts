import { Injectable } from '@nestjs/common';
import { Message } from './message/models/Message';

@Injectable()
export class AppService {
  getHello(): Message {
    return {
      messages: [
        { text: 'Welcome to the Chatfuel Rockets!' },
        { text: 'What are you up to?' },
      ],
    };
  }
}
