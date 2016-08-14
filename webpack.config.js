'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, 'src'),
    target: 'web',
    debug: true,
    entry: [
        'webpack-dev-server/client?http://localhost:9000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            // Transform JSX in .jsx files
            { test: require.resolve("react"), loader: "expose?React" },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot','babel'],
                exclude: '/node_modules/',
                include: path.join(__dirname, 'src')
            }
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
};