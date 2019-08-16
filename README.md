# Drone Status

## Archived

The need of this project has been fulfilled by adding a Drone service to the [node-build-monitor](https://github.com/marcells/node-build-monitor) project.

See the PR here https://github.com/marcells/node-build-monitor/pull/185




**ONGOING WORK, NOT FINALIZED** See the Todo list behind.

This is an app showing all your builds and repositories statuses on your DroneCI server.

It is designed to be used as a monitoring app, typically shown on a screen in a devs office.

It is compatible with Drone 1.0 and is not retrocompatible with Drone 0.8. For Drone 0.8, see [drone-wall](https://github.com/drone/drone-wall)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

Create a .env file containing a _REACT_APP_DRONE_API_ and _REACT_APP_DRONE_TOKEN_ variables.

Run `yarn start` and open `http://localhost:3000`

To build the app, `yarn build`

## Security disclaimer

> TLDR: Don't make any built code of this app publicly accessible, or all your repositories code will leak

The way the Drone Token is passed to the App is not secure yet. The token will be clearly visible on the Javascript code - and this token should allow any smart attacker to access all your repositories code (so possibly your company code too).

I need to fix that (see Todo), but until then **do not publish any built/watch code**, especially on Github.

## Todo

- [x] Code API calls on Redux
- [ ] Test the Redux stack (actions & reducers)
- [ ] Put the Drone URL and Drone Tokens out of the env variables (in URL, Cookies or Local Storage for example)
- [ ] Create a decent UI
- [ ] Test the UI with Snapshots

## Contribute

I'm currently on pause on that project as I'm not using Drone anymore. This project has been pushed so that people who need it can use my work. Feel free to fork it or to do pull requests.

I'm not sure I'll have time to contribute a lot more, but I can surely do the gardener and maybe let other active contributors become collaborators on it.
