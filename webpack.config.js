var path = require('path');

var inputPath = path.resolve(__dirname, 'navigation/js');
var outputPath = path.resolve(__dirname, 'src/main/resources');

module.exports = {

    entry: inputPath + '/navigation.js',

    output: {
        path: outputPath,
        filename: 'navigation.js'
    },

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

    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        fallback: path.join(__dirname, 'node_modules'),
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js'
        }
    },

    resolveLoader: {
        fallback: path.join(__dirname, 'node_modules'),
        alias: {
            'hbs': 'handlebars-loader'
        }
    }
};