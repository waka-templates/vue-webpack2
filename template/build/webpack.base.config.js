'use sreict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let vendor = ['vue'];
let projectRoot = path.resolve(__dirname, '../');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
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
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ["css-loader",{
                        loader: 'postcss-loader',
                        options:{
                            plugins: [
                                require('autoprefixer')({ browsers: ['last 5 versions','Android >= 4.0', 'iOS >= 7'] })
                            ],
                            sourceMap: "inline"
                        }
                    }]
                })
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
            'vue': 'vue/dist/vue.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new ExtractTextPlugin("styles.css"),
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
