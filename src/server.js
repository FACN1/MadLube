const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const handlebars = require('handlebars');

const port = process.env.PORT || 4040;

const server = new hapi.Server();

server.connection({
  port
});

server.register([inert, vision], (err) => {
  if (err) throw err;

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

  server.start((error) => {
    if (error) throw err;
    console.log('Server running at:', server.info.uri);
  });
});
