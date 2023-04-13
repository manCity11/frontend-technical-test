import { UsersApi } from './users.api';

const { UsersService } = jest.requireActual('./users.service');

describe('UsersService', () => {
  describe('getUsers', () => {
    test('should call users api', () => {
      // @ts-ignore
      UsersApi.getUsers.mockResolvedValue();

      UsersService.getUsers();

      expect(UsersApi.getUsers).toBeCalled();
    });
  });

  describe('getUser', () => {
    test('should call users api', () => {
      const userId = 1;
      // @ts-ignore
      UsersApi.getUser.mockResolvedValue();

      UsersService.getUser(userId);

      expect(UsersApi.getUser).toBeCalledWith(userId);
    });
  });
});
