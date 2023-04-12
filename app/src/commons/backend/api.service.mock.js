/* istanbul ignore file */
jest.mock('./api.service', () => ({
  ApiService:{
    call: jest.fn(),
  },
}));
