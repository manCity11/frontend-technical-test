/* istanbul ignore file */
export interface ConversationType {
  id: number;
  senderId: number;
  senderNickname: string;
  recipientId: number;
  recipientNickname: string;
  lastMessageTimestamp: number;
}

export interface NewConversationPayload {
  recipientId: number;
}
