const jsonServer = require('json-server');
const redirectRoutes = require('./routes.json');
const conversationMiddleware = require('./middleware/conversations');

const serve = (cb) => {
  const server = jsonServer.create();
  const router = jsonServer.router(__dirname + '/db.json');

  server.use(jsonServer.defaults());
  server.use(jsonServer.rewriter(redirectRoutes));
  server.use(router);
  server.use(conversationMiddleware);
  server.listen(3005);

  cb();
};

module.exports = serve;
