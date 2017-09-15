
const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: "./client/index.html",
	filename: "index.html",
	inject: "body",
});
module.exports = {
	entry: "./client/index.jsx",
	output: {
		path: path.resolve("dist"),
		filename: "index_bundle.js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{ loader: "css-loader", options: { modules: true, importLoaders: 1 } },
				],
			},
			{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },
		],
	},
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty",
		dns: "empty",
	},
	plugins: [
		new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
		new ExtractTextPlugin("[name].css"),
		HtmlWebpackPluginConfig],
};
