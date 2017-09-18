require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const redis = require('redis');
const client = redis.createClient();
const path = require('path');
const webpack = require('webpack');
const webpackConfigDev = require('./webpack.config');
const webpackConfigProd = require('./webpack.config.prod.js');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');


client.on('connect', () => {
    console.log('connected');
});

app.use(logger('dev'));
app.use(express.static(path.resolve(`${__dirname}/public`)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = parseInt(process.env.PORT, 10) || 3000;
app.set('port', PORT);


const webpackConfig = process.env.NODE_ENV === 'production' ? webpackConfigProd : webpackConfigDev;
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.path,
    noInfo: true
  })
);

require('./server/routes')(app);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/public/index.html`));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running on localhost PORT: ${PORT}`);
});

module.exports = app;