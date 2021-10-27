// api-key.middleware.js
const HttpStatus = require('http-status-codes');
module.exports = (req, res, next) => {
    if (req.header('API-Key') !== process.env.API_KEY) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json ({ message: 'Invalid x-api-key'});
    }
    next();
};
