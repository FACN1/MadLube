module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    reply('welcome to welcome!');
  }
};
