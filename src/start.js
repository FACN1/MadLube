const server = require('./server.js');

server.start((error) => {
  if (error) throw error;
  console.log('Server running at:', server.info.uri);
});
