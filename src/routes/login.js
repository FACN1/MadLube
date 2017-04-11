const querystring = require('querystring');

const BASE_URL = process.env.NODE_ENV === 'PRODUCTION' ?
'https://madlube.herokuapp.com/' : 'http://localhost:4040';

module.exports = {
  method: 'GET',
  path: '/login',
  handler: (request, reply) => {
    const queries = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: `${BASE_URL}/welcome`
    });
    reply.redirect(`https://github.com/login/oauth/authorize?${queries}`);
  }
};
