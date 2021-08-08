/* eslint-disable @typescript-eslint/naming-convention */
const path = require('path');

const outputFilename = 'index.js';
const devServerPort = 8111;

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: './src/renderer/index.ts',
  output: {
    path: path.join(__dirname, 'out', 'renderer'),
    filename: outputFilename,
    publicPath: '',
    libraryTarget: 'module',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'src/renderer/tsconfig.json',
          transpileOnly: true,
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
				test: /\.svg$/,
				loader: 'svg-inline-loader',
			},      
    ],
  },
  devServer: {
    port: devServerPort,
    hot: true,
    disableHostCheck: true,
    writeToDisk: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
});
