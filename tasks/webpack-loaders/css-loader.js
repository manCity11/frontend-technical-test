module.exports = (isServedLocally) => {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  const loaders = [
    /* eslint-disable no-process-env */
    (process.env.NODE_ENV === 'test' || isServedLocally) ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('autoprefixer'),
          ],
        },
      },
    },
  ];

  return {
    test: /\.css$/,
    use: loaders,
  };
};
