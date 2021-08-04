﻿const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('--------------------------------------------');
console.log('--------------Build Development-------------');
console.log('--------------------------------------------');
console.log('');

module.exports = {
    mode: "development",
    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'polyfills': './ClientApp/polyfills.ts',
        'vendor': './ClientApp/vendor.ts',
        'app': './ClientApp/main.ts'
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/wwwroot/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader',
                    'source-map-loader',
                    'tslint-loader'
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

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'ClientApp/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './ClientApp/images/*.*', to: 'assets/', flatten: true }
        ]),

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