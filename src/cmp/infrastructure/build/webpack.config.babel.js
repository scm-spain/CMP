import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const WEBPACK_MODE_PRODUCTION = 'production'
const OUTPUT_DIST_FOLDER = 'dist'
const ENTRY_PATH_CMP = './src/index.js'
const OUTPUT_FILENAME_DEV = 'cmp.dev.js'
const OUTPUT_FILENAME_PRO = 'cmp.pro.js'

const getMajorVersionFromPackageJsonVersion = () => {
  return JSON.stringify(process.env.npm_package_version.split('.')[0])
}

let webpackConfig = {
  entry: ENTRY_PATH_CMP,
  output: {
    path: path.resolve(OUTPUT_DIST_FOLDER),
    filename: OUTPUT_FILENAME_DEV,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CMP_VERSION: getMajorVersionFromPackageJsonVersion()
    }),
    new CleanWebpackPlugin([OUTPUT_DIST_FOLDER], {
      verbose: true,
      root: process.cwd()
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === WEBPACK_MODE_PRODUCTION) {
    webpackConfig.output.filename = OUTPUT_FILENAME_PRO
  }
  return webpackConfig
}
