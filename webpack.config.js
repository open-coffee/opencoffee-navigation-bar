var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var autoprefixer = require ('autoprefixer');

var inputPath = path.resolve(__dirname, 'navigation');
var outputPath = path.resolve(__dirname, 'src/main/resources');

module.exports = {

    entry: {
        "bundle": inputPath + '/main.js',
        "bundle.min": inputPath + '/main.js'
    },

    output: {
        path: outputPath,
        filename: '[name].js'
    },

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract ('style', ['css?modules', 'postcss'])
            },
            {
                test: /\.jpg|png|svg|gif/,
                loader: 'url'
            },
            {
                test: /\.js$/,
                include: path.resolve (__dirname, 'navigation'),
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new ExtractTextPlugin ('css/navigation.css')
    ],

    postcss: function () {
        return [autoprefixer];
    }
};
