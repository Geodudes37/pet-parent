const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './client/public/main.js'),
    mode: process.env.NODE_ENV,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
      // host: 'localhost',
      // port: 8080,
      // hot: true,
      // historyApiFallback: true,
  
    //   static: {
    //     directory: path.resolve(__dirname, 'build'),
    //     publicPath: '/',
    //   },
  
      proxy: {
        '/': 'http://localhost:3000',
        // '/login': 'http://localhost:3000',
        // '/signup/request': 'http://localhost:3000',
        // '/home/user': 'http://localhost:3000',
        // '/home/NPS': 'http://localhost:3000',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        // template: './client/public/index.html',
        // filename: './client/public/index.html',
        template: path.resolve(__dirname,'client/public/index.html'),
        filename: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [`@babel/preset-env`, `@babel/preset-react`],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
  