const connPool = require('../database/db_connection.js');

const getPosts = (callback) => {
  connPool.query('SELECT * FROM posts', callback);
};

const createPost = (data, callback) => {
  connPool.query('INSERT INTO posts (dish, user_id, description, chef_name, background_color) VALUES ($1, $2, $3, $4, $5)', [data.dish, 1, data.description, data.chef_name, data.background_color], callback);
};

const createUser = (userData, callback) => {
  connPool.query(
    'INSERT INTO users (username, name) VALUES ($1, $2)',
    [userData.login, userData.name],
    (err, result) => {
      console.log(result.rows[0]);
      callback(null, result.rows[0].id);
    }
  );
};

const getUserId = (username, callback) => {
  connPool.query(
    'SELECT * FROM users WHERE username=$1',
    [username],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      if (result.rows.length === 1) {
        return callback(null, result.rows[0].id);
      }
      return callback(null, -1);
    }
  );
};

module.exports = {
  getPosts,
  createPost,
  createUser,
  getUserId
};
