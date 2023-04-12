import { ConversationsApi } from './conversations.api';
import { Conversation } from './models/conversation.model';

export const ConversationsService = function () {
  return {
    getConversations(userId: number): Promise<Conversation[]> {
      return ConversationsApi.getConversations(userId)
        .then((conversations = []) => conversations.map((conversation) => new Conversation(conversation)));
    },
    createConversations(userId: number, recipientId: number): Promise<{ id: number }> {
      return ConversationsApi.createConversations(userId, recipientId);
    },
    deleteConversation(conversationId: number): Promise<void> {
      return ConversationsApi.deleteConversation(conversationId);
    },
  };
}();