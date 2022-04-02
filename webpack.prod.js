const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge.merge(
	baseWebpackConfig,
	(module.exports = {
		mode: 'production',
		devtool: 'source-map',
		output: {
			filename: '[name].min_[chunkhash:10].js',
			path: path.resolve(__dirname, 'dist'),
		},
		// 优化 配置
		optimization: {
			minimize: true,
			chunkIds: 'size',
			mangleExports: 'size',
			minimizer: [
				// 启动多线程压缩
				new TerserPlugin({
					parallel: true, // 启动平行压缩
				}),
			],
			splitChunks: {
				chunks: 'async',
				minSize: 20000,
				minRemainingSize: 0,
				minChunks: 1,
				maxAsyncRequests: 30,
				maxInitialRequests: 30,
				enforceSizeThreshold: 50000,
				cacheGroups: {
					defaultVendors: {
						// filename: '[name].min.[chunkhash].js',
						test: /[\\/]node_modules[\\/]/,
						// chunks: 'initial',
						priority: -10,
						reuseExistingChunk: true,
					},
					default: false,
					// default: {
					// 	minChunks: 2,
					// 	priority: -20,
					// 	reuseExistingChunk: true,
					// },
				},
			},
		},
	}),
);
