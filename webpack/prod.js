const { resolve } = require('path');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
    clean: true,
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
};
