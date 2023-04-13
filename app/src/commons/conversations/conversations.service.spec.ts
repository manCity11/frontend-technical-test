import { ConversationsApi } from './conversations.api';

const { ConversationsService } = jest.requireActual('./conversations.service');

describe('ConversationsService', () => {
  const userId = 1;

  describe('getConversations', ()  => {
    test('should call conversations api', () => {
      // @ts-ignore
      ConversationsApi.getConversations.mockResolvedValue();

      ConversationsService.getConversations(userId);

      expect(ConversationsApi.getConversations).toBeCalledWith(userId);
    });
  });

  describe('createConversations', ()  => {
    test('should call conversations api', () => {
      const recipientId = 2;
      // @ts-ignore
      ConversationsApi.createConversations.mockResolvedValue();

      ConversationsService.createConversations(userId, recipientId);

      expect(ConversationsApi.createConversations).toBeCalledWith(userId, recipientId);
    });
  });

  describe('deleteConversation', ()  => {
    test('should call conversations api', () => {
      const conversationId = 3;
      // @ts-ignore
      ConversationsApi.deleteConversation.mockResolvedValue();

      ConversationsService.deleteConversation(conversationId);

      expect(ConversationsApi.deleteConversation).toBeCalledWith(conversationId);
    });
  });
});
