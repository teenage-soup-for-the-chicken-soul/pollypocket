const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['babel-polyfill', './client/index'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  // mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // }
    ]
  }
};
