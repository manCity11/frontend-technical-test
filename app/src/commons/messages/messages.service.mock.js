/* istanbul ignore file */
jest.mock('./messages.service', () => ({
  MessagesService:{
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
    deleteMessage: jest.fn(),
  },
}));
