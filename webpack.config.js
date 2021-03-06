const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      systemvars: true
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    port: 3000
  }
};
