const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main']
            }),
            new WebpackPwaManifest({
                name: 'PWA Text Editor',
                short_name: 'pwa-txt-edtr',
                description: 'An application that allows you write and save text files.',
                background_color: '#01579b',
                theme_color: '#ffffff',
                start_url: '/',
                icons: [
                    {
                        src: path.resolve('./src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                    }
                ]
            }),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'service-worker.js'
            })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        
      ],
    },
  };
};
