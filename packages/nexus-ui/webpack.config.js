const rootConfig = require('../../webpack.config');

module.exports = {
  entry: {
    'nexus-ui': __dirname + '/src/nexus-ui.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/',
  },
  ...rootConfig,
};
