const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    'root-application': 'root-application.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000' 
    },
    {
      test: /\.scss$/,
      use: [
          // only use the mode of development
         MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
      ]
  },
  {
    test: /\.css$/,  
    include: /node_modules/,  
    loaders: ['style-loader', 'css-loader'],
  },
  {
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
      },
    },
  ],
}],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          'node_modules/single-spa-layout-app/dist/img',
        ),
        to: path.resolve(__dirname, 'dist/img'),
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: false,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
  },
};
