const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: 'ts-loader',
                test: /\.ts$/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'view.js',
    },
};
