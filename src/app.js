const express = require('express');
const feb19 = require('./cohorts/feb19');

const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/', (_, res) => {
  res.status(200).json({ Feb19: feb19 });
});

module.exports = app;
