module.exports = {
  method: 'GET',
  path: '/add',
  config: {
    auth: 'jwt-strategy'
  },
  handler: (request, reply) => {
    reply.view('add');
  }
};
