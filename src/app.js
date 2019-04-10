const profiles = require('./cohorts/feb19-profiles.json');
const repos = require('./cohorts/feb19-repos.json');
const events = require('./cohorts/feb19-events.json');
const express = require('express');
const feb19 = require('./cohorts/feb19');
const Axios = require('axios');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const flatProfiles = repos.feb19.reduce((a, b) => {
  return a.concat(b);
});

const flatEvents = events.feb19.reduce((a, b) => {
  return a.concat(b);
});

app.get('/users', (_, res) => {
  res.status(200).json({ Feb19: feb19 });
});

app.get('/activity', (_, res) => {
  const getAllFebStudentsProfiles = feb19.map(student => {
    const url = `https://api.github.com/users/${student}/events`;
    return Axios.get(
      url,
      {
        auth: {
          username: 'ian-antking',
          password: process.env.TOKEN,
        },
      }
    ).then(response => response.data);
  });

  Promise.all(getAllFebStudentsProfiles).then(data => {
    res.status(200).json({ feb19: data });
  });
});

app.get('/users/:name', (req, res) => {
  const profile = profiles.feb19.find(user => {
    return user.login.toLowerCase() === req.params.name.toLowerCase();
  });

  const userRepos = flatProfiles.filter(repo => {
    return repo.owner.login.toLowerCase() === req.params.name.toLowerCase();
  });

  const userEvents = flatEvents.filter(event => {
    return event.actor.login.toLowerCase() === req.params.name.toLowerCase();
  });

  res.status(200).json({
    profile: profile,
    repos: userRepos,
    events: userEvents,
  });
});

module.exports = app;
