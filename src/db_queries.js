const connPool = require('../database/db_connection.js');

const getPosts = (callback) => {
  connPool.query('SELECT * FROM posts', callback);
};

const createPost = (data, callback) => {
  connPool.query('INSERT INTO posts (dish, user_id, description, chef_name, background_color) VALUES ($1, $2, $3, $4, $5)', [data.dish, data.user_id, data.description, data.chef_name, data.background_color], callback);
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
        console.log(`user: ${username}, id: ${result.rows[0].id}`);
        return callback(null, result.rows[0].id);
      }
      return callback(null, -1);
    }
  );
};

const createUser = (userData, callback) => {
  // need to add access token as well but need to change db schema for this
  connPool.query(
    'INSERT INTO users (username, name) VALUES ($1, $2)',
    [userData.login, userData.name],
    (err) => {
      if (err) {
        return callback(err);
      }
      console.log('new user added: ');
      // bad as now currently doing 2 db queries
      return getUserId(userData.login, callback);
    }
  );
};

const getOrCreateUserId = (userData, callback) => {
  getUserId(userData.login, (err, userId) => {
    if (err) {
      callback(err);
    }
    if (userId === -1) {
      return createUser(userData, (createUserErr, newUserId) => {
        if (createUserErr) {
          return callback(createUserErr);
        }
        return callback(null, newUserId);
      });
    }
    return callback(null, userId);
  });
};

module.exports = {
  getPosts,
  createPost,
  createUser,
  getUserId,
  getOrCreateUserId
};
