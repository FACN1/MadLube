module.exports = {
  method: 'GET',
  path: '/error',
  handler: (request, reply) => {
    reply.view('error');
  }
};
