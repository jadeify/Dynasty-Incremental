module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		library: 'lib',
	},
	devtool: 'source-map',
};