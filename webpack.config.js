var path = require('path');
var webpack = require('webpack');

var inputPath = path.resolve(__dirname, 'navigation/js');
var outputPath = path.resolve(__dirname, 'src/main/resources');

module.exports = {

    entry: inputPath + '/main.js',

    output: {
        path: outputPath,
        filename: 'bundle.js'
    },

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: 'bundle.min.js'
        })
    ]
};