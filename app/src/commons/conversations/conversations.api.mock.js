/* istanbul ignore file */
jest.mock('./conversations.api', () => ({
  ConversationsApi:{
    getConversations: jest.fn(),
    createConversations: jest.fn(),
    deleteConversation: jest.fn(),
  },
}));
