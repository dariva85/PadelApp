const config = require('./config');

class ApiError extends Error {
  constructor(code, message) {
    super();
    this.name = "ApiError";
    this.code = code;
    this.message = message;
  }
}

const catchErrors = (routeHandler) => async (req, res, next, ...args) => {
    try {
      await routeHandler(req, res, next, ...args);
    } catch (err) {
      next(err);
    }
  };

const errorHandler = (err, req, res, next) => {
  if (err.name === "ApiError") {
    const { code, message } = err;
    return res.status(code).send({ error: message });
  }
  res.status(500).send({
    error: `Internal Error`,
  });
};

const errMalformed = (res, message, errorType) => {
  if(errorType === 'ValidationError' || errorType === 'NotFound') {
      res.status(400).send({error: message});
  } else if( errorType === 'CastError') {
    res.status(400).send({error: `The specified id or a field don't have a valid value`});
  } else if ('DuplicateValue') {
    res.status(400).send({error: `Duplicate Key Error Collection`});
  } else {
    res.status(400).send({error: `Can't process the request`});
  }
};

const errUnauthorized = (message) => {
  throw new ApiError(401, message);
};

module.exports = {
    ApiError,
  catchErrors,
  errorHandler,
  errMalformed,
  errUnauthorized,
};
