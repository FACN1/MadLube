const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const handlebars = require('handlebars');
const jwtAuth = require('hapi-auth-jwt2');

const port = process.env.PORT || 4040;

const server = new hapi.Server();

server.connection({
  port
});

server.register([inert, vision, jwtAuth], (err) => {
  if (err) throw err;

  function jwtValidate(decoded, request, callback) {
    // decoded contains info about token but not payload
    // custom validation
    callback(null, true);
  }

  // create a strategy named jwt-strategy
  server.auth.strategy('jwt-strategy', 'jwt', {
    key: process.env.JWT_SECRET,
    validateFunc: jwtValidate,
    verifyOptions: {
      algorithms: ['HS256'] // pick a strong algorithm
    }
  });

  server.views({
    engines: {
      hbs: handlebars
    },
    relativeTo: __dirname,
    helpersPath: '../views/helpers',
    path: '../views',
    layout: 'layout',
    partialsPath: '../views/partials',
    layoutPath: '../views/layout'
  });

  server.route(routes);
});

module.exports = server;
