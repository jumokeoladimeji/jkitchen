const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
logger = require('morgan')
redis = require('redis'),
client = redis.createClient();

client.on('connect', () => {
    console.log('connected');
});

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = parseInt(process.env.PORT, 10) || 3000;
require('./server/routes')(app);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running on localhost PORT: ${PORT}`);
});

module.exports = app;