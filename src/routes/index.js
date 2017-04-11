const staticFiles = require('./staticFiles.js');
const home = require('./home.js');
const login = require('./login.js');
const add = require('./add.js');
const createPost = require('./createPost.js');
const welcome = require('./welcome.js');

module.exports = [
  staticFiles,
  home,
  login,
  add,
  createPost,
  welcome
];
