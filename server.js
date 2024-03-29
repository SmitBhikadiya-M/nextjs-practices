const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Explicitly listen on IPv6 address
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://[::]:3000');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });
});