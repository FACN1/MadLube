const connPool = require('../database/db_connection.js');


const getPosts = (callback) => {
  connPool.query('SELECT * FROM posts', (error, result) => {
    if (error) {
      return callback(error);
    }
    return callback(null, result.rows);
  });
};

const createPost = (data, callback) => {
  connPool.query('INSERT INTO posts (dish, description, chef_name, background_color) VALUES ($1, $2, $3, $4)', [data.dish, data.description, data.chef_name, data.background_color], callback);
};

module.exports = {
  getPosts,
  createPost
};
