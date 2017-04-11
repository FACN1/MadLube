const dbQueries = require('../db_queries');

module.exports = {
  method: 'post',
  path: '/create-post',
  handler: (request, reply) => {
    const data = request.payload;
    dbQueries.createPost(data, (err) => {
      if (err) {
        return reply(err);
      }
      return reply('You added a new post');
    });
  }
};
