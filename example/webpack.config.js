const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        stats: 'minimal',
        contentBase: __dirname
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: path.join(__dirname, '../lib/index.js'),
                        options: {
                            tag: 'Pretty_Logger',
                            hook: '#'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader', path.join(__dirname, '../lib/in-js.js')],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}