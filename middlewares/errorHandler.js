
const {
	CustomError,
	createCustomError
} = require('../errors/customError');
const {
	StatusCodes
} = require('http-status-codes');


const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		res.status(err.status).json({
			msg: err.message
		});
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: err.message
		});
	}
}

module.exports = errorHandler;