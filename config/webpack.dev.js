const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(env), {
        mode: 'development',

        devtool: 'cheap-module-eval-source-map',

        output: {
            publicPath: 'http://localhost:4200/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: {
            inline: true,
            port: 4200,
            historyApiFallback: true,
            clientLogLevel: 'none',
            stats: 'minimal',
            open: 'Chrome'
        }
    });
}