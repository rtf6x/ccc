const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const isProd = process.env.NODE_ENV === 'production';
const app = express();

const serve = (file, cache) => express.static(path.resolve(__dirname, file), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use(favicon('./public/logo-48.png'));
app.use('/public', serve('./public', true));
app.use('/api', require('express-http-proxy')('https://api.coincap.io'));
app.use(serve('./dist', true));

app.listen('9292', () => {
  console.log(`server started at http://localhost:9292`);
});
