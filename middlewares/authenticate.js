const { createCustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith('Bearer')) {
		const token = authHeader.split(' ')[1];
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			next();
		} catch(err) {
			throw createCustomError("Invalid token provided", StatusCodes.UNAUTHORIZED);
		}
	} else {
		throw createCustomError("NO auth token provided", StatusCodes.UNAUTHORIZED);
	}

}

module.exports = authenticateUser;