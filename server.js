import autoprefixer from 'autoprefixer';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import schema from './schema';

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
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'index.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
    ],
  },
  plugins: [
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
        ]
      }
    }),
  ],
  output: {filename: 'app.js', path: '/'},
});
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
});
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
