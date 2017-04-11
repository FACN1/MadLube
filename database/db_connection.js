const url = require('url');
const Pool = require('pg').Pool;
require('env2')('./config.env');

if (!process.env.DB_URL) {
  throw new Error('Environment variable DB_URL must be set');
}

const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(':');

const config = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

module.exports = new Pool(config);
