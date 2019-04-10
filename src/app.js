const Axios = require('axios');

const express = require('express');
const feb19 = require('./cohorts/feb19');

const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/', (_, res) => {
  const getAllFebStudentsProfiles = feb19.map(student => {
    const url = `https://api.github.com/users/${student}/events`;
    return Axios.get(url, 
      {
        auth: {
          username: 'ian-antking',
          password: process.env.TOKEN,
        },
      }
    ).then(response => response.data).catch(error => console.log(error));
  });

  Promise.all(getAllFebStudentsProfiles).then(data => {
    res.status(200).json({ feb19: data });
  });
});

module.exports = app;
