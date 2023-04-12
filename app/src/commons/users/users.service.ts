import { UsersApi } from './users.api';
import { User } from './types';

export const UsersService = function () {
  return {
    getUsers(): Promise<User[]> {
      return UsersApi.getUsers();
    },
    getUser(userId: number): Promise<User> {
      return UsersApi.getUser(userId);
    },
  };
}();
