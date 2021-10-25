const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/public/js/";

module.exports = {
  entry: {
    app: BASE_JS + "app.js",
    //move: BASE_JS + "move.js",
    showImage: BASE_JS + "showImage.js",
    home: BASE_JS + "home.js",
    cert: BASE_JS + "cert.js",
  },
  //mode: "development", //only on dev mode
  //watch: true, //only on dev mode
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "imgs/[name].[ext]",
        },
      },
    ],
  },
};
