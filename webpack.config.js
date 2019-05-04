const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const { mode } = options;
  return {
    entry: {
      index: path.resolve(__dirname, './src/index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'application.js',
      chunkFilename: '[name].js',
    },
    devServer: {
      overlay: true,
      contentBase: path.resolve(__dirname, './src'),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          // use: ['style-loader', 'css-loader'],
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              // options: {
              //   modules: true,
              //   sourceMap: true,
              // },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'styles.css',
        chunkFilename: '[id].css',
      }),
    ],
    devtool: mode === 'development' ? 'eval-source-map' : false,
    resolve: {
      // modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', 'css'],
    },
  };
};
