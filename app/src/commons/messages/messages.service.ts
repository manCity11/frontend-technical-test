import { MessagesApi } from './messages.api';

export const MessagesService = function () {
  return {
    getMessages(conversationId) {
      return MessagesApi.getMessages(conversationId);
    },
    sendMessage(conversationId, data) {
      return MessagesApi.sendMessage(conversationId, data);
    },
    deleteMessage(messageId) {
      return MessagesApi.deleteMessage(messageId);
    },
  };
}();