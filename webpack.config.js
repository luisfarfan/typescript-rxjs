var path = require('path');
module.exports = {
    entry: "./src/index.ts",
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}