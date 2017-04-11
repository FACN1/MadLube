const path = require('path');
const dbQueries = require('./db_queries.js');
const querystring = require('querystring');

const BASE_URL = process.env.NODE_ENV === 'PRODUCTION' ?
'https://madlube.herokuapp.com/' : 'http://localhost:4040';

const staticFiles = {
  method: 'GET',
  path: '/{file}',
  handler: {
    directory: {
      path: path.join(__dirname, '../public')
    }
  }
};

const index = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    dbQueries.getPosts((err, postsArray) => {
      if (err) {
        return reply(err);
      }
      const context = {
        posts: postsArray.reverse()
      };
      return reply.view('index', context);
    });
  }
};

const add = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    reply.view('add');
  }
};

const createPost = {
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

const login = {
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

const welcome = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    reply('welcome to welcome!');
  }
};

module.exports = [
  staticFiles, index, add, createPost, login, welcome
];
