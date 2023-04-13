/* istanbul ignore file */
jest.mock('./conversations.service', () => ({
  ConversationsService:{
    getConversations: jest.fn(),
    createConversations: jest.fn(),
    deleteConversation: jest.fn(),
  },
}));
