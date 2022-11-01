module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.js',
  output: {
    // path: `${__dirname}/dist`,
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },
  devServer: {
    // static: './dist',
    static: './public',
  },
  resolve: {
    extensions: ['.js', '.glsl', '.vs', '.fs'],
  },
  module: {
    rules: [
      //Javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      //Shader
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source',
        generator: {
          filename: 'assets/images/[hash][ext]',
        }
      },
      //Images
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        }
      },
      //CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}