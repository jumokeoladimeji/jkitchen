require('dotenv').config();
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan')

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = parseInt(process.env.PORT, 10) || 8000;

app.listen(PORT, (err) => {
  if (err) {
    // logger
  }
  console.log(`The server is running on localhost PORT: ${PORT}`);
});

module.exports = app;
