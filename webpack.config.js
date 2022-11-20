const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
	entry: ["./src/index.js"],
	watch: isDevelopment,
	output: {
		path: path.resolve(__dirname, "assets/js"),
		filename: isDevelopment ? "thrill-of-hope.js" : "thrill-of-hope.min.js",
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: [".js"],
	},
};
