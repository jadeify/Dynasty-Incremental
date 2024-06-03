module.exports = {
    // …
    entry: './src/index.js',
    output: {
        library: 'lib',
    },
    mode: 'none',
    optimization: {
        mangleExports: false,
        checkWasmTypes: false,
    },
    devtool: 'source-map',
}