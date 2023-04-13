/* istanbul ignore file */
jest.mock('./users.service', () => ({
  UsersService:{
    getUsers: jest.fn(),
    getUser: jest.fn(),
  },
}));
