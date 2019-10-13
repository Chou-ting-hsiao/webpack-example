'use strict';

const webpackMerge      = require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader')
const commonConfig      = require('./webpack.config.common');
const moment            = require('moment')
const helpers           = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',

    devtool: 'inline-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: `[name].${moment().format('YYYYMMDDHmmss')}.js`,
        globalObject: "this"
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                  {
                      loader: 'awesome-typescript-loader',
                      options: {
                          configFileName:helpers.root('tsconfig.json')
                      }
                  },
                  'angular2-template-loader',
                  'angular-router-loader'
              ],
              exclude: [/node_modules/]
            }
        ]
    },

    plugins: [
        new CheckerPlugin()
    ]
});