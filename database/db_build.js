const fs = require('fs');
const path = require('path');
const connPool = require('./db_connection.js');

const sql = fs.readFileSync(path.join('./db_build.sql')).toString();

connPool.query(sql, (error) => {
  if (error) throw error;
  console.log('Successfully created table! Woo!!');
});
