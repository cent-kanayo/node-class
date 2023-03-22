const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err instanceof Unauthorized) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ msg: err });
};
module.exports = errorHandler;
