/* istanbul ignore file */
jest.mock('./messages.api', () => ({
  MessagesApi:{
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
    deleteMessage: jest.fn(),
  },
}));
