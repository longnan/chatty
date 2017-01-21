var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './src/main/webapp/polyfills.browser.ts',
        'vendor': './src/main/webapp/vendor.browser.ts',
        'main': './src/main/webapp/main.browser.ts',
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './dist'),
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            path.resolve(__dirname, './src'),
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),

    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, '../../node_modules') ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
/*
var webpack = require('webpack');
var path = require('path');


// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './src/main/webapp/polyfills.browser.ts',
        'vendor': './src/main/webapp/vendor.browser.ts',
        'main': './src/main/webapp/main.browser.ts',
    },

    output: {
        path: './dist',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
            {test: /\.css$/, loaders: ['to-string-loader', 'css-loader']},
            {test: /\.html$/, loader: 'raw-loader'}
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [path.join(__dirname, 'src')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
*/