
const User = require('../models/User');

const { CustomError, createCustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const loginUser = async (req, res) => {

	const {
		email,
		password
	} = req.body;

	if (email && password) {
		const user = await User.find({ email });
		if (user && user.length) {
			const userToLogin = user[0];
			if (userToLogin.comparePassword(password)) {
				const token = userToLogin.generateJWT()
				const dataToSend = {
					name: userToLogin.name,
					email: userToLogin.email,
					id: userToLogin._id,
					token: token
				}
				return res.status(StatusCodes.OK).send({ status: 'success', data: dataToSend });
			} else {
				invalidLogin();
			}
		} else {
			invalidLogin();
		}
	} else {
		throw createCustomError(`Please provide email & password !`, StatusCodes.BAD_REQUEST);
	}
}


const registerUser = async (req, res) => {
	const {
		name,
		email,
		password
	} = req.body;

	if (name && email && password) {
		const user = await User.find({ email });
		if (user && user.length) {
			throw createCustomError(`${email} already registered`, StatusCodes.CONFLICT);
		} else {
			const createdUser = await User.create({
				name,
				email,
				password
			});
			const token = createdUser.generateJWT();
			res.status(StatusCodes.OK).send({ status: 'success', data: { ...req.body, token: token } });
		}
	} else {
		throw createCustomError(`Incomplete data: name, email, password is required`, StatusCodes.CONFLICT)
	}
}


function invalidLogin() {
	throw createCustomError(`Failed to login, The password or email that you have entered is incorrect.`, StatusCodes.UNAUTHORIZED)
}


module.exports = {
	loginUser,
	registerUser
}