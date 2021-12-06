
const {
	StatusCodes
} = require('http-status-codes');

const notFound = (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).send('No route found');
}

module.exports = notFound;