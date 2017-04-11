const server = require('./server.js');
const tape = require('tape');

tape('check the home route', (t) => {
  server.inject({ url: '/', method: 'GET' }, (res) => {
    const testString = '<title>Saucy Psychic Ninjas Guesthouse Dinners</title>';
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes(testString), 'served html should contain the right title');
    t.end();
  });
});

tape.onFinish(() => process.exit(0));
