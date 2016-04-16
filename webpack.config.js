var webpack = require('webpack')
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
		extensions: ['', '.js', '.jsx']
	},


	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("bundle.css"),
	]
}