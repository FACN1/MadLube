const server = require('./server.js');
const tape = require('tape');

tape('check the home route', (t) => {
  const options = {
    url: '/',
    method: 'GET'
  };
  server.inject(options, (res) => {
    const testString = '<title>MadLube Blog</title>';
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes(testString), 'served html should contain the right title');
    t.end();
  });
});

tape('check the css file', (t) => {
  const options = {
    url: '/style.css',
    method: 'GET'
  };

  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes('body {'), 'serverd css file should include "body {"');
    t.end();
  });
});

tape('check the error file on the server', (t) => {
  const options = {
    url: '/error',
    method: 'GET'
  };

  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes('<h2 id="errorMessage">Sorry! Something went wrong...</h2>'), 'served error file should include "<h2 id="errorMessage">Sorry! Something went wrong...</h2>"');
    t.end();
  });
});

tape.onFinish(() => process.exit(0));
