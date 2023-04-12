const path = require('path');

module.exports = {
  src: {
    htmlIndex: 'app/src/index.ejs',
    appPath: path.resolve(__dirname, '../app'),
    commonsPath: path.resolve(__dirname, '../app/commons'),
    locales: './src/**/locales-',
    entries: {
      app: './app/src/main.tsx',
    },
    fontsTypes: /\.(eot|ttf|woff|woff2|svg)$/,
    imagesTypes: /\.(jpg|png|svg|gif)$/,
    images: [
      path.resolve(__dirname, '../app'),
    ],
    reports: {
      scripts: ['+(app|tasks|e2e)/**/*.+(js|jsx)'],
      styles: ['app/**/*.scss'],
      maxWarnings: 9,
    },
  },
  dest: {
    distPath: path.resolve(__dirname, '../dist/'),
    clean: [
      path.resolve(__dirname, '../.tmp'),
      path.resolve(__dirname, '../dist'),
    ],
    styleFileName: 'styles',
    tmp: '.tmp',
    fonts: 'fonts',
    images: 'images',
    locales: path.resolve(__dirname, '../dist/locales'),
  },
  stats: {
    all: false,
    colors: true,
    entrypoints: true,
    chunkGroupMaxAssets: 15,
    errors: true,
  },
  envs: ['dev','prod', 'e2e'],
  langs: ['fr'],
};
