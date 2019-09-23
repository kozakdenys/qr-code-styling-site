const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "src");
const distPath = path.resolve(rootPath, "dist");

const config = {
    entry: srcPath + "/index.js",
    output: {
        path: distPath,
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
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: srcPath + "/index.html"
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