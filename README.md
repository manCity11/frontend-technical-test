# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercise :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

# Getting started
To begin to work, execute commands suites:

```
npm i install
npm i -g gulp
```

# Available Scripts
Project is built upon gulp orchestration. Check gulpfile.js to get all available commands (serve, e2e, test, lint)

## `npm run test`

Launches the tests runner for the app.

## `npm run lint`

Launches linter for styles (style-lint) and scripts (eslint) for the hole app

## `gulp serve`

Run the app in development mode.
Use --env={dev|prod} flag to get desired config (default dev)
[http://localhost:3000] to view it in the browser.

## `gulp build`

Everything is built in `dist` readt to deploy on any web server.

## `gulp e2e`

Launches the e2e tests which executes test cases (desktop, mobile) and compares it to base snapshots, which are located in `e2e/cypress/snapshots/base`. Those snapshots should be generated we the same machine otherwise it may have differences between machines.

### Commands
```
  gulp e2e # start e2e tests
  gulp e2e --init # start e2e test creating base snapshots
  gulp e2e --ui # open cypress ui control panel to create test
  gulp e2e --local # use local imagebase to check scennshots
  gulp e2e --singleRun # to only run desktop tests
```
