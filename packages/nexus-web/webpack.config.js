const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootConfig = require('../../webpack.config');

module.exports = {
  ...rootConfig,
  entry: {
    'nexus-web': __dirname + '/src/nexus-web.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [...rootConfig.plugins, new HtmlWebpackPlugin()],
};
