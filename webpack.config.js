const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "src");
const docsPath = path.resolve(rootPath, "docs");

const config = {
    entry: srcPath + "/index.js",
    output: {
        path: docsPath,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: srcPath,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: srcPath,
                loader: "file-loader"
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: srcPath + "/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        })
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "inline-source-map";
        config.mode = argv.mode;
    }

    if (argv.mode === "production") {
        config.devtool = "source-map";
        config.mode = argv.mode;
    }

    return config;
};