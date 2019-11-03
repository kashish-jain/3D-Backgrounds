var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  //...
  plugins : [
    new CopyPlugin([
      {from : 'src/textures', to : 'textures'}
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};