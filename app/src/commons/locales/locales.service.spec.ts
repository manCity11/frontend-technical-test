import dayjs from 'dayjs';

jest.mock('dayjs', () => ({ locale: jest.fn(), extend: jest.fn() }));
const { LocalesService } = jest.requireActual('./locales.service');

describe('LocalesService', () => {
  beforeEach(() => {
    document.createDocumentFragment = jest.fn();
    document.body.appendChild = (script: any) => script.onload();
  });

  describe('initLocales', () => {
    test('should return if no moment key found', () => {
      LocalesService.initLocales({}, 'fr');

      expect(dayjs.locale).toHaveBeenCalledTimes(0);
    });

    test('should return if no moment key found', () => {
      LocalesService.initLocales({ moment: {} }, 'fr');

      expect(dayjs.locale).toHaveBeenCalled();
    });
  });

  describe('fetchLocales', () => {
    test('should init locales after script append', (done) => {
      LocalesService.initLocales = jest.fn();

      LocalesService.fetchLocales('http://locales-url', 'fr')
        .then(() => {
          expect(LocalesService.initLocales).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('getDefaultLocales', () => {
    test('should init locales', () => {
      LocalesService.initLocales = jest.fn();

      LocalesService.getDefaultLocales({ fr: {} }, 'fr');
      expect(LocalesService.initLocales).toHaveBeenCalled();
    });
  });
});
