var path = require('path');
var webpack = require('webpack');

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

    devtool: 'cheap-source-map',

    module: {
        loaders: [
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
    ]
};
