/* istanbul ignore file */
jest.mock('./users.api', () => ({
  UsersApi:{
    getUsers: jest.fn(),
    getUser: jest.fn(),
  },
}));
