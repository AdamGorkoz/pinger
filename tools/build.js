var webpack = require('webpack');
var webpackConfig = require('../webpack.prod.config');
var colors = require('colors');

console.log(colors.green.bold("Starting build process..."));

webpack(webpackConfig).run(function(err,stats){
	if(err){
		console.log(colors.red.bold(err));
		return 1;
	}
	var jsonStats = stats.toJson();
	if(stats.hasErrors()){
		console.log(colors.red.bold("Webpack generated the following errors: "));
		return jsonStats.errors.map(function(error){
			console.log(colors.red(error));
		})
	}

	if(stats.hasWarnings()){
		console.log(colors.yellow.bold("Webpack generated the following warnings: "));
		return jsonStats.warnings.map(function(warning){
			console.log(colors.yellow(warning));
		})
	}
	console.log(colors.green.bold("Build completed"));
	return 0;
})