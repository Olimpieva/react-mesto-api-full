const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  console.log({ origin });
  console.log(allowedCors.includes(origin));

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  console.log({ requestHeaders });
  console.log({ method });

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};
