const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Name of the bundled file
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match JavaScript files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'babel-loader', // Use Babel for transpiling JavaScript
                    options: {
                        presets: ['@babel/preset-env'] // Use preset for latest JavaScript features
                    }
                }
            },
            {
                test: /\.css$/, // Match CSS files
                use: ['style-loader', 'css-loader'] // Use style-loader and css-loader for bundling CSS
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Match image files
                type: 'asset/resource' // Use asset/resource to emit the file as-is
            }
        ]
    }
};
