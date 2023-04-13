module.exports = {
  rootDir: process.cwd(), // where jest.config is otherwise
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tasks/tests/helpers/fileMock.js',
    '\\.css$': 'identity-obj-proxy',
    '\\.(scss|i18n)$': '<rootDir>/tasks/tests/helpers/styleMock.js',
    MAIN_CONFIG: '<rootDir>/tasks/tests/helpers/configMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/tasks/tests/helpers/tests.setup.js'],
  transformIgnorePatterns: ['/node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)'],
  coverageReporters: ['html'],
  testEnvironment: 'jsdom',
  displayName: 'app',
  roots: ['<rootDir>/app'],
  coverageThreshold: {
    global: {
      statements: 55,
      lines: 50,
      branches: 55,
      functions: 59,
    },
  },
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'app/{commons,src}/**/*.{ts,tsx}',
    '!app/{commons,src}/**/*.{mock,module,constants,constant,route,route-paths,api,types}.{ts,tsx}',
  ],
};
