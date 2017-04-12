module.exports = {
  method: 'GET',
  path: '/add',
  config: {
    auth: {
      strategy: 'jwt-strategy',
      mode: 'required'
    }
  },
  handler: (request, reply) => {
    const context = {
      isNotHomePage: true,
      isAuthenticated: request.auth.isAuthenticated,
      username: request.auth.credentials.username,
      avatar_url: request.auth.credentials.img_url
    };
    reply.view('add', context);
  }
};
