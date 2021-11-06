'use strict'

const path = require('path')
const paths = require('./paths')

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
	const isEnvProduction = webpackEnv === 'production'

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
		entry: paths.appIndexJs,

    devtool: isEnvDevelopment ? 'source-map' : undefined,

    output: {
      path: paths.appBuild,
    },

    module: {
      rules: [
        // Javascript
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      extensions: ['.js'],
    },

    stats: {
      preset: "errors-only",
    }
  }
}
