var path = require ('path');

var inputPath = path.resolve (__dirname, 'src/main/resources/es2015');
var outputPath = path.resolve (__dirname, 'src/main/resources');

module.exports = {

    entry: inputPath + '/navigation_es2015.js',

    output: {
        path: outputPath,
        filename: 'navigation.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};