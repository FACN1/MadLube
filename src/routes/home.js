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
        isNotAddPage: true,
        isAuthenticated: request.auth.isAuthenticated,
        username: request.auth.credentials ? request.auth.credentials.username : null,
        avatar_url: request.auth.credentials ? request.auth.credentials.img_url : null,
        posts: postsArray.rows.reverse()
      };
      return reply.view('index', context);
    });
  }
};
