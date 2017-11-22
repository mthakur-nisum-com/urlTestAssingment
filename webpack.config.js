var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, './public/components');
var APP_DIR = path.resolve(__dirname, './public/build');
module.exports = {
    entry: BUILD_DIR + '/Main.jsx',
    output: {
        path: APP_DIR,
        filename: '[name].js',
        library: ['app']
    },
    cache: false,
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
}