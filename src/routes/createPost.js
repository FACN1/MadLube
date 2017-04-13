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
    if (request.auth.credentials) {
      data.user_id = request.auth.credentials.id;
    } else {
      // should never really happen, but should be dealt with better
      data.user_id = 1;
    }
    dbQueries.createPost(data, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.redirect('/');
    });
  }
};
