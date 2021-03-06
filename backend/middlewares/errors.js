const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = error.message;

    //wrong mongoose ovject id Error
    if (err.name == "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //handle mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //handleing mongoose dupilicate key errors

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)}`;
      error = new ErrorHandler(message, 400);
    }

    //handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = `JSON web token is invalid`;
      error = new ErrorHandler(message, 400);
    }
    //handle expired token
    if (err.name === "TokenExpiredError") {
      const message = `JSON web token is expired`;
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
