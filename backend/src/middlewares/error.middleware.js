import { ApiError } from '../utils/ApiError.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (!(err instanceof ApiError)) {
    //! development error
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    //! production error
    if (process.env.NODE_ENV === 'production') {
      statusCode = 500;
      message = 'Internal Server Error';
    }
  }

  const response = {
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };

  return res.status(statusCode).json(response);
};

export { errorHandler };
