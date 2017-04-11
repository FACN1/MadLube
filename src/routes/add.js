module.exports = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    reply.view('add');
  }
};
