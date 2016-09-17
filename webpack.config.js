const webpack = require('webpack')

module.exports = {
  output: {
    library: 'ReactRouter.addons.Routes',
    libraryTarget: 'umd'
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-router': {
      root: 'ReactRouter',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router'
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
