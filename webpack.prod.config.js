'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	noInfo: true,
	target: 'web',
	debug: false,
    context: path.join(__dirname, 'src'),
    entry: [
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
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
    	new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};