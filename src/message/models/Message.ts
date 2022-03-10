export type Message = {
  messages: Array<MessageContent>;
  redirect_to_blocks?: Array<string>;
};

export type MessageContent = {
  attachment?: Attachment;
  text?: string;
};

export type Attachment = {
  type: string;
  payload: MessagePayload;
};

export type MessagePayload = {
  template_type: string;
  text: string;
  buttons?: Array<MessageButton>;
};

export type MessageButton = {
  type?: string;
  url?: string;
  title: string;
  block_names?: Array<string>;
};
