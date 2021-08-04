const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const fse = require('fs-extra');

console.log('--------------------------------------------');
console.log('--------------Build Production--------------');
console.log('--------------------------------------------');
// Копирование PrimeNG в AOT папку
console.log('--------------Trying copy files-------------');
console.log('--------------------------------------------');
try {
    fse.copySync(
        './node_modules/primeng/components',
        './ClientApp/aot/node_modules/primeng/components',
        {
            overwrite: false,
            errorOnExist: false
        }
    );
    console.log('--------------Copy success------------------');
} catch (err) {
    console.log('--------------Copy fail---------------------');
    console.error(err)
}
console.log('--------------------------------------------');
console.log('');
//----------------------------------------------------------------

module.exports = {
    mode: "production",
    entry: {
        'vendor': './ClientApp/vendor.ts',
        'polyfills': './ClientApp/polyfills.ts',
        'app': './ClientApp/main-aot.ts' // AoT compilation
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader' },
                    { loader: 'angular2-template-loader' }
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                use: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'ClientApp/style'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: path.join(__dirname, 'ClientApp/style'),
                use: [
                    'raw-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),
        new CopyWebpackPlugin([
            { from: './ClientApp/images/*.*', to: 'assets/', flatten: true }
        ]),

        new webpack.NoEmitOnErrorsPlugin(),

        new UglifyJSPlugin({
            parallel: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'ClientApp/index.html'
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.Tether': 'tether',
            tether: 'tether',
            Tether: 'tether'
        })
    ]
};