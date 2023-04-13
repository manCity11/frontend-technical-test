import { ConversationType }  from '../types';

export class Conversation {
  id: number;
  senderId: number;
  senderNickname: string;
  recipientId: number;
  recipientNickname: string;
  lastMessageTimestamp: number;
  displayedLastMessageTimestamp: number;

  constructor({ id, senderId, senderNickname, recipientId, recipientNickname, lastMessageTimestamp }: ConversationType) {
    this.id = id;
    this.senderId = senderId;
    this.senderNickname = senderNickname;
    this.recipientId = recipientId;
    this.recipientNickname = recipientNickname;
    this.lastMessageTimestamp = lastMessageTimestamp;
    this.displayedLastMessageTimestamp = lastMessageTimestamp * 1000;
  }
}