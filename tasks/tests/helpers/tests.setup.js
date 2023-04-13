require('@testing-library/jest-dom');

require('babel-plugin-require-context-hook/register')();
const dayjs = require('dayjs');
const _ = require('lodash');

global._ = _;
global.dayjs = dayjs;
global.SVGElement = global.Element;

const mockContext = require.context('../../../app/', true, /\.mock\.js$/);
mockContext.keys().forEach(mockContext);
