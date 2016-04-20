var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 20',
	'Firefox >= 24',
	'Explorer >= 8',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6'
]

module.exports = {
	entry: './app/main.js',

	output: {
		filename: 'bundle.js',
		path: './static/'
	},

	module: {
		loaders: [
			{ test: /.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime&loose=all' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?localIdentName=[local]___[hash:base64:5]&sourceMap!postcss-loader')}
		]
	},

	postcss: function() {
		return [
			require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
			require('postcss-nested'),
			require('postcss-simple-vars'),
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			'action': path.join(__dirname, './app/action'),
			'api': path.join(__dirname, './app/api'),
			'component': path.join(__dirname, './app/component'),
			'config': path.join(__dirname, './app/config'),
			'container': path.join(__dirname, './app/container'),
			'reducer': path.join(__dirname, './app/reducer'),
			'img': path.join(__dirname, './static/img')
		}
	},


	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("bundle.css")
	]
}