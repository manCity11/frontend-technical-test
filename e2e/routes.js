/* eslint-disable no-undef */

/* TODO not possible right now to wait for a channel, because the channels are stubbed by stub-picture.js
-> if you intercept them, you cancel the stubbing... find if it can be done correctly... */

const routes = {
  getUsers: {
    method: 'GET',
    url: '**/users',
    fixture: 'get-users',
  },
  getConversations: {
    method: 'GET',
    url: '**/conversations/*',
    fixture: 'get-conversations',
  },
  getMessages: {
    method: 'GET',
    url: '**/messages/*'
  }
};

class Route {
  constructor(name = '') {
    const {
      method = 'GET', url, fixture,
    } = routes[name];
    const currentUrl = url;
    this.method = method;

    if (currentUrl) {
      this.url = currentUrl;
    }

    this.fixture = fixture;
  }
}

export const getRoute = (options = {}) => {
  const { name = '', data, statusCode } = options;
  const { method, url, fixture } = new Route(name);
  const routeMatcher = { method, url };

  const staticResponse = {};
  if (data) {
    staticResponse.body = data;
  } else if (fixture) {
    staticResponse.fixture = fixture;
  }

  if (statusCode) {
    staticResponse.statusCode = statusCode;
  }

  return cy.intercept(routeMatcher, staticResponse);
};
