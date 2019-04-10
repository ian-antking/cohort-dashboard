const express = require('express');
const feb19 = require('./cohorts/feb19');

const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/users', (_, res) => {
  res.status(200).json({ Feb19: feb19 });
});

app.get('/users/:name', (req, res) => {
  res.status(200).json({ name: req.params.name });
});

module.exports = app;
