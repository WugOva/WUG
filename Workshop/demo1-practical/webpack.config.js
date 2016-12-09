module.exports = {
    entry: './app/main.js',
    output: {
         path: './build',
         filename: 'bundle.js'
     },
     devtool: 'source-map',
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                 presets: ['es2015']
             }
         }]
     }
}