module.exports = {
    // …
    entry: './src/index.js',
    output: {
        library: 'lib',
    },
    optimization: {
        mangleExports: true,
    },
};