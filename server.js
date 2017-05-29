import autoprefixer from 'autoprefixer';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import schema from './schema';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';


const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

//  graphQL Server
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// App Server
const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'index.js')],
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',
            ],
          }),
        ],
      },
    }),
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: [
          'file-loader?name=[hash:8].[ext]&publicPath=/static/&outputPath=media/',
        ],
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/static/',
});
app.use('/*', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
