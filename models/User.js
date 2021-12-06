const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name !']
	},
	email: {
		type: String,
		required: [true, 'Please provide email !'],
		match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
	},
	password: {
		type: String,
		minLength: [6, 'Password length must be atleast 6 characters !'],
		required: [true, 'Please provide password !']
	}
});

userSchema.methods.generateJWT = function () {

	const userObj = {
		name: this.name,
		email: this.email
	}

	const token = jwt.sign(userObj, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});

	return token;

}

userSchema.methods.comparePassword = function (password) {
	const userPassword = this.password;
	console.log(userPassword, password);
	return userPassword === password;
}

const User = mongoose.model('Users', userSchema);

module.exports = User;