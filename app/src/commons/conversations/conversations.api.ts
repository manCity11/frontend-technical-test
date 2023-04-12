/* istanbul ignore file */
import { ApiService } from '../backend/api.service';
import { ConversationType, NewConversationPayload } from './types';

export const ConversationsApi = function() {
  return {
    getConversations(userId: number): Promise<ConversationType[]> {
      return ApiService.call({
        url: `/conversations/${userId}`,
      });
    },
    createConversations(userId: number, recipientId: number): Promise<{ id: number }> {
      return ApiService.call({
        url: `/conversations/${userId}`,
        method: 'POST',
        data: { recipientId } as NewConversationPayload
      });
    },
    deleteConversation(conversationId: number): Promise<void> {
      return ApiService.call({
        url: `/conversations/${conversationId}`,
        method: 'DELETE',
      });
    },
  };
}();
