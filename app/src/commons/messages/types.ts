/* istanbul ignore file */
export interface Message {
  id: number;
  conversationId: number;
  authorId: number;
  timestamp: string;
  body: string;
}

export interface NewMessagePayload {
  body: string;
  recipientId: number;
}
