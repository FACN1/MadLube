const Request = require('request');
const jwt = require('jsonwebtoken');

const dbQueries = require('../db_queries');

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    const accessTokenRequestBody = {
      code: request.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };
    const accessTokenRequestOptions = {
      method: 'POST',
      body: accessTokenRequestBody,
      url: 'https://github.com/login/oauth/access_token',
      json: true
    };
    // send the code with the client_secret and client_id to GH, to get the access token
    Request(accessTokenRequestOptions, (tokenError, tokenReponse, tokenBody) => {
      if (tokenError) {
        // to be changed to a more appropriate response
        return reply(tokenError);
      }
      if (!tokenBody.access_token) {
        // to be changed to a more appropriate response
        return reply(tokenBody);
      }
      const githubAccessToken = tokenBody.access_token;
      const userInfoRequestOptions = {
        url: `https://api.github.com/user?access_token=${githubAccessToken}`,
        headers: {
          'User-Agent': 'madlube',
          Authorization: `token ${githubAccessToken}`
        }
      };
      // now we have the accesstoken, we request user info from GH
      // return is just to suppress the linter
      return Request.get(userInfoRequestOptions, (infoError, infoResponse, infoBody) => {
        if (infoError) {
          return reply(infoError);
        }
        // for now, reply with the user info
        // really we want to store it in our database and issue an authorization cookie
        const parsedInfoBody = JSON.parse(infoBody);
        let userId;

        dbQueries.getUserId(parsedInfoBody.login, (error, res) => {
          if (error) {
            return reply(error);
          }
          if (res === -1) {
            // create user in database if doesn't exist already
            return dbQueries.createUser(parsedInfoBody, (err, result) => {
              if (err) {
                return reply(err);
              }
              // need to get newUserId somehow
              userId = newUserId;
              // #linter
              return 0;
            });
          }
          userId = res;
          return 0;
        });


        const payload = {
          username: parsedInfoBody.login,
          img_url: parsedInfoBody.avatar_url,
          id: userId
        };
        const options = {
          expiresIn: Date.now() + (24 * 60 * 60 * 1000),
          subject: 'github-data'
        };

        return jwt.sign(payload, process.env.JWT_SECRET, options, (error, token) => {
          if (error) {
            return reply(error);
          }
          return reply.redirect('/').state('token', token, {
            isHttpOnly: false,
            isSecure: process.env.NODE_ENV === 'PRODUCTION'
          });
        });
      });
    });
  }
};
