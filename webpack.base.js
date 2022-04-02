const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	cache: {
		type: 'filesystem',
		store: 'pack',
		compression: 'gzip',
	},
	entry: './src/index.ts',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
        clean: true
	},
	resolve: {
		extensions: ['.ts', '.js', 'glsl'],
	},
	module: {
		rules: [
			// TS
			{
				test: /.ts$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			// Images
			{
				test: /\.(jpg|png|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/images/',
						},
					},
				],
				exclude: /node_modules/,
			},
			// Shaders
			{
				test: /\.(glsl|vs|vert|frg)$/,
				exclude: /node_modules/,
				use: ['raw-loader'],
			},
		],
	},
	plugins: [
        
		new HtmlWebpackPlugin({
			title: 'Tree Js',
			filename: 'index.html',
			template: './index.html',
			inject: 'body',
		}),
		new CopyPlugin({
			patterns: [{ from: 'resource', to: 'resource' }],
		}),
	],
};
