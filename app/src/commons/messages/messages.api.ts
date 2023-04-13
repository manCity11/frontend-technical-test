/* istanbul ignore file */
import { ApiService } from '../backend/api.service';
import { Message, NewMessagePayload } from './types';

export const MessagesApi = function () {
  return {
    getMessages(conversationId: number): Promise<Message[]> {
      return ApiService.call({
        url: `/messages/${conversationId}`,
      });
    },
    sendMessage(conversationId: number, data: NewMessagePayload): Promise<{ id: number }> {
      return ApiService.call({
        url: `/messages/${conversationId}`,
        method: 'POST',
        data,
      });
    },
    deleteMessage(messageId: number): Promise<void> {
      return ApiService.call({
        url: `/messages/${messageId}`,
        method: 'DELETE',
      });
    }
  };
}();
