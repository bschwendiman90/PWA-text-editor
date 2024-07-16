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
        clean: true,
        assetModuleFilename: '[name][ext]', // No hash in filename
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // filename: 'index.html',
            // chunks: ['main']
            }),
            new WebpackPwaManifest({
                fingerprints: false,
                name: 'PWA Text Editor',
                short_name: 'pwa-txt-edtr',
                description: 'An application that allows you to write and save text files.',
                background_color: '#01579b',
                theme_color: '#ffffff',
                start_url: '/',
                publicPath: '/',
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'),
                    }
                ]
            }),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'src-sw.js',
            })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        },
        
      ],
    },
  };
};
