const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    dbQueries.getPosts((err, postsArray) => {
      if (err) {
        return reply(err);
      }
      const context = {
        posts: postsArray.reverse()
      };
      return reply.view('index', context);
    });
  }
};
