module.exports = {
    // …
    entry: './src/index.js',
    output: {
        library: 'lib',
    },
    optimization: {
        mangleExports: false,
        checkWasmTypes: false,
    },
    devtool: 'source-map',
}