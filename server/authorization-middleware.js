const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  if (!req.headers['x-access-token']) {
    throw new ClientError(401, 'authentication required');
  } else {
    req.user = jwt.verify(req.headers['x-access-token'], process.env.TOKEN_SECRET);
    next();
  }
}

module.exports = authorizationMiddleware;
