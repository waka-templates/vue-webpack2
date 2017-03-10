'use sreict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let vendor = ['vue'];
let projectRoot = path.resolve(__dirname, '../');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader:'vue-loader',
                    options: {
                      postcss: [
                          require('autoprefixer')({ browsers: ['last 5 versions','Android >= 4.0', 'iOS >= 7'] })
                      ]
                    }
                }]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [
                  path.join(projectRoot, 'src')
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]?[hash]'
                    }
                }]
            },
            {
                test: /\.(swf|eot|svg|ttf|woff|svg)$/,
                use: ["file-loader"]
            }
        ]
    },

    resolve:{
        extensions:[".js",".vue"],
        modules: [path.join(__dirname, '../node_modules')],
        alias:{
            '@src': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components'),
            'vue$': 'vue/dist/vue.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            filename:"vendor.js"
        }),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        })
    ]
};
