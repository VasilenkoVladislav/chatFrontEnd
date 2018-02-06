global.Promise = require('bluebird');

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const publicPath = 'http://localhost:8050/static/build/';
const cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';
const ManifestPlugin = require('webpack-manifest-plugin');

const plugins = [
    new ManifestPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName),
    new UglifyJsPlugin()
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/static/build/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
}

module.exports = {
    entry: ['babel-polyfill', './src/client/client.js'],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx']
    },
    plugins,
    output: {
        path: `${__dirname}/public/static/build/`,
        filename: jsName,
        publicPath
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})) },
            { test: /\.scss$/, use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})) },
            { test: /\.gif$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/gif'}}] },
            { test: /\.jpg$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/jpg'}}] },
            { test: /\.png$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/png'}}] },
            { test: /\.cur$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/cur'}}] },
            { test: /\.svg$/, use: [{loader: 'url-loader', options: {limit: 26000, mimetype: 'image/svg+xml'}}] },
            { test: /\.jsx?$/,
                loader: process.env.NODE_ENV !== 'production'
                    ? ['react-hot-loader/webpack', 'babel-loader']
                    : 'babel-loader',
                exclude: [/node_modules/, /public/] },
            { test: /\.jsx?$/, loader: 'eslint-loader', include: path.resolve(process.cwd(), 'src'), enforce: 'pre' }
        ]
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};
