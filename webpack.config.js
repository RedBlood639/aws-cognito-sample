module.exports = {
  mode: 'development',
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './src/entry.js',
  // html: './index.html',
  // Place output files in `./dist/my-app.js`
  output: {
    path: __dirname + '/public/dist',
    filename: 'my-app.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
