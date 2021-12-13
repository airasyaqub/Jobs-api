
const {
	CustomError,
	createCustomError
} = require('../errors/customError');
const {
	StatusCodes
} = require('http-status-codes');


const errorHandler = (err, req, res, next) => {


	let customError = {
		message: err.message || 'Something went wrong try again later',
		status: err.status || StatusCodes.INTERNAL_SERVER_ERROR
	}


	if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.status = 400
  }


	if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.status = 400
  }


	if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`
    customError.status = 404
  }


	res.status(customError.status).json(customError.message);

}

module.exports = errorHandler;