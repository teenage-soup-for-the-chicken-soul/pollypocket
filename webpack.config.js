<<<<<<< HEAD
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
=======

module.exports = {
  entry: ['babel-polyfill', './client/index'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
>>>>>>> proofOfConcept/master
  module: {
    rules: [
      {
        test: /\.jsx?$/,
<<<<<<< HEAD
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
=======
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      // use the style-loader/css-loader combos for anything matching the .css extension
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
};
>>>>>>> proofOfConcept/master
