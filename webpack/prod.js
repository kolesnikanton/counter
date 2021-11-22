const { resolve } = require('path');

module.exports = {
  entry: './src/index.tsx',
  externals: [
    'react',
    'react-dom',
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: resolve(__dirname, '..', 'lib'),
    filename: 'index.js',
    publicPath: '/',
    clean: true,
    library: {
      type: 'commonjs',
    },
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
};
