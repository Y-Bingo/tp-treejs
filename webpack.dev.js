const path = require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = webpackMerge.merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, './'),
		},
		devMiddleware: {
			// writeToDisk: true,
		},
		static: './',
		compress: true, //如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用
		host: 'localhost', // 设置主机名，默认为"localhost"
		port: 9933, // 设置端口号,默认端口号为8080
		historyApiFallback: true, //让所有404错误的页面定位到index.html
		hot: 'only',
		liveReload: false,
		open: false, //启动服务器时，自动打开浏览器，默认为false
	},
});
