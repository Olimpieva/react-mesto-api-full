// const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const allowedCors = [
  'https://mesto-project.nomoredomains.rocks',
  'http://mesto-project.nomoredomains.rocks',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  // eslint-disable-next-line
  console.log({ origin });
  // eslint-disable-next-line
  console.log({ 'isAllowedCorsIncludesOrigin': allowedCors.includes(origin) });

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    // eslint-disable-next-line
    console.log({ 'ResHeader': res.header })
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // eslint-disable-next-line
  console.log({ requestHeaders });
  // eslint-disable-next-line
  console.log({ method });

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // eslint-disable-next-line
    console.log({ 'ResHeader': res.header })
    res.end();
  }

  next();
};
