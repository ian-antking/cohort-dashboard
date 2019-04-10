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

app.get('/users/:name', (req, res) => {
  const profile = profiles.feb19.find(user => {
    return user.login.toLowerCase() === req.params.name.toLowerCase();
  });

  const simpleProfile = {
    login: profile.login,
    avatar: profile.avatar_url || profile.gravatar_url,
    url: profile.url,
    repos: profile.public_repos,
    followers: profile.follower,
    following: profile.following,
    location: profile.location,
    company: profile.company,
  };

  const userRepos = flatProfiles.filter(repo => {
    return repo.owner.login.toLowerCase() === req.params.name.toLowerCase();
  });

  const simpleRepos = userRepos.map(repo => {
    return {
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      created: repo.created_at,
      lastUpdate: repo.pushed_at,
      forks: repo.forks,
      watchers: repo.watchers,
    };
  });

  const userEvents = flatEvents.filter(event => {
    return event.actor.login.toLowerCase() === req.params.name.toLowerCase();
  });

  const simpleEvents = userEvents.map(event => {
    return {
      type: event.type,
      repo: event.repo.name,
      messages: event.payload.commits ? event.payload.commits.map(commit => commit.message) : null,
      time: event.created_at,
    };
  });

  res.status(200).json({
    profile: simpleProfile,
    repos: simpleRepos,
    contributions: simpleEvents.length,
    events: simpleEvents,
  });
});

module.exports = app;
