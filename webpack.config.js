const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    libraryTarget: 'umd',
  // options related to how webpack emits results
  path: path.resolve(__dirname, "client/dist"), // string
  // the target directory for all output files
  // must be an absolute path (use the Node.js path module)
  filename: "bundle.js", // string    // the filename template for entry chunks
  publicPath: "/dist/", // string    // the url to the output directory resolved relative to the HTML page
 },
 stats: 'errors-only',
 devServer: {
  hot: true,
  contentBase: path.join(__dirname, 'client/dist'),
  compress: true,
  port: 3000
}
};
