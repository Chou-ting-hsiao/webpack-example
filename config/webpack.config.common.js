'use strict';


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin             = require('html-webpack-plugin');
const CopyPlugin             = require('copy-webpack-plugin');
const helpers                = require('./helpers');
const isDev                  = process.env.NODE_ENV !== 'production';


module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.aot.ts'
    },

    resolve: {
        extensions: ['.ts', ".js"]
    },

    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                "to-string-loader",
                "css-loader"
              ]
            },
            {
              test: /\.html$/,
              loader: 'html-loader',
              options: {
                ignoreCustomFragments: [/\{\{.*?}}/],
                root: helpers.root('src'),
                attrs: ['img:src']
              },
              
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader:'file-loader',
                options: {
                    outputPath: 'asset/img',
                },
            },
            // This hides some deprecation warnings that Webpack throws
            {
              test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
              parser: { system: true },
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),  
        new HtmlPlugin({
          filename: 'index.html',
          template: 'src/index.html',
          inject:"body",
          favicon:'src/favicon.ico',
          minify: {
            removeComments: true,
            collapseWhitespace: false
          }
        }),
        new CopyPlugin([
          { from: 'node_modules/hello-wasm/hello_wasm_bg.wasm', to: '' },
        ]),
    ]
};