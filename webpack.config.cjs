const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,  

  entry: {
    background: "./public/background.js",
    popup: "./public/popup.js",
    content: "./public/content.js"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "." } // copies all static files (icons, manifest.json) to dist/
      ]
    })
  ]
};
