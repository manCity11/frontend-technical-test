import axios from 'axios';

const { ApiService } = jest.requireActual('./api.service');
const api_url = 'http://localhost.com';

jest.mock('axios', () => jest.fn());
jest.mock('MAIN_CONFIG', () => ({  backendHost: api_url }));

describe('ApiService', () => {
  describe('call', () => {
    test('should send specific boolean flag during refractor $httpProvider.interceptors', () => {
      const params = {
        method: 'GET',
        url: '/api/test',
      };

      (axios as any).mockResolvedValue({});
      ApiService.call(params);

      expect(axios).toBeCalledWith({ ...params, url: api_url + params.url });
    });
  });
});
