var path = require('path');

var inputPath = path.resolve(__dirname, 'navigation/js');
var outputPath = path.resolve(__dirname, 'src/main/resources');

module.exports = {

    entry: inputPath + '/navigation.js',

    output: {
        path: outputPath,
        filename: 'navigation.js'
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
    }
};