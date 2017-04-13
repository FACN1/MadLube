const dbQueries = require('../db_queries');

module.exports = {
  method: 'post',
  path: '/create-post',
  config: {
    auth: {
      strategy: 'jwt-strategy',
      mode: 'required'
    }
  },
  handler: (request, reply) => {
    const data = request.payload;
    dbQueries.createPost(data, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.redirect('/');
    });
  }
};
