/* istanbul ignore file */
jest.mock('./locales.service', () => ({
  LocalesService: {
    getI18n: jest.fn().mockReturnValue({ get: jest.fn() }),
    fetchLocales: jest.fn(),
  }
}));
