const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container

const deps = require("./package.json").dependencies;
module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }),
    new ModuleFederationPlugin({
      name: "Search",
      filename: "main.bundle.js",
      remotes: {},
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      utils: path.resolve(__dirname, 'src/utils/'),
      shared: path.resolve(__dirname, 'src/components/shared/'),
    },
  },
};
