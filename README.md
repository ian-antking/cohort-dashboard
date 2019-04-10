# MCR-Codes Cohort API

## Returns a json with the github usernames of each MCR-Codes cohort.
## For use with the "Cohort Dashboard" group coding exercise.

### Installation
Clone the repositry by your preferred means.

Install the repositry from the command line with npm:

```
    npm install
```

### Usage

The dev server can be started with the command:

```
    npm start dev
```

By default the app listens of port 4000. If this is not suitable, a specific port can be set in the `PORT` variable of a `.env` file. for example:

```
    PORT = 8080
```

The app will respond to `GET` requests to `/users` with a JSON of the current cohorts of MCR-Codes.
Requests to `/users/:name` will recieve github profile, repo and acticity data for the specified user.