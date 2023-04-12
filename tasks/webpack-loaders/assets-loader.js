module.exports = () => {
  const { isProd } = require('../env-helper');
  const { dest, src } = require('../build-config');

  const imagesLoader = {
    test: src.imagesTypes,
    include: src.images,
    type: 'asset/resource',
    generator: {
      filename: `${dest.images}/[name]${isProd ? '-[contenthash]' : ''}[ext]`,
    },
  };

  const fontsLoader = {
    test: src.fontsTypes,
    include: src.fonts,
    type: 'asset/resource',
    generator: {
      filename: `${dest.fonts}/[name]${isProd ? '-[contenthash]' : ''}[ext]`,
    },
  };

  return {
    imagesLoader,
    fontsLoader,
  };
};
