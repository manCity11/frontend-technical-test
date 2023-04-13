import { MessagesApi } from './messages.api';

const { MessagesService } =  jest.requireActual('./messages.service');

describe('MessagesService', () => {
  const conversationId = 1;

  describe('getMessages', () => {
    test('should call messages api', () => {
      // @ts-ignore
      MessagesApi.getMessages.mockResolvedValue();

      MessagesService.getMessages(conversationId);

      expect(MessagesApi.getMessages).toBeCalledWith(conversationId);
    });
  });

  describe('sendMessage', () => {
    test('should call messages api', () => {
      const newMessage = {};
      // @ts-ignore
      MessagesApi.sendMessage.mockResolvedValue();

      MessagesService.sendMessage(conversationId, newMessage);

      expect(MessagesApi.sendMessage).toBeCalledWith(conversationId, newMessage);
    });
  });

  describe('deleteMessage', () => {
    test('should call messages api', () => {
      const messageId = 2;
      // @ts-ignore
      MessagesApi.deleteMessage.mockResolvedValue();

      MessagesService.deleteMessage(messageId);

      expect(MessagesApi.deleteMessage).toBeCalledWith(messageId);
    });
  });
});
