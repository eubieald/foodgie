const path = require('path'); // require path module so we can use in our module.exports
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: { // multiple entrypoints setup
        bundle: path.resolve(__dirname, 'src/index.js'), // entry point of our app with a filename called bundle
    },
    output: { //output of our npm run build to generate a bundle file
        path: path.resolve(__dirname, 'docs'),
        filename: '[name][contenthash].js', // multiple entry naming setup, kung ano name sang entry point sa babaw
        clean: true, // prevent from stacking new generated entry files,
        assetModuleFilename: '[name][ext]', //asset dynamic filename
    },

    // Adding source maps for debugging
    devtool: 'source-map',

    // setup devserver
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'docs')
        },
        port: 4000,
        open: true, //when npm run build is execute in terminal it will automatically open the app in the browser
        hot: true, // hot reloading
        compress: true, // enable gzip compression
        historyApiFallback: true,
    },

    //setup loaders
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            // setup backward compatibility using babel
            {
                test: /\.js$/,
                exclude: /node_modules/, //exclude javascript files under node_modules folder
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },

    // setup plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/template.html'
        }),
    ]
}  