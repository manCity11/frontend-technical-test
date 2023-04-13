/* istanbul ignore file */
import { ApiService } from '../backend/api.service';
import { User } from './types';

export const UsersApi = function() {
  return {
    getUsers(): Promise<User[]> {
      return ApiService.call({
        url: '/users',
      });
    },
    getUser(userId): Promise<User> {
      return ApiService.call({
        url: `/users/${userId}`,
      });
    }
  };
}();
