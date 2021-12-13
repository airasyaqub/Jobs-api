const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
		unique: true
	},
	password: {
		type: String,
		minLength: [6, 'Password length must be atleast 6 characters !'],
		required: [true, 'Please provide password !']
	}
});




userSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt);
})



userSchema.methods.generateJWT = function () {
	const userObj = {
		name: this.name,
		id: this._id
	}
	const token = jwt.sign(userObj, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});
	return token;
}

userSchema.methods.comparePassword = async function (typedPassword) {

	const isMatch = await bcrypt.compare(typedPassword, this.password);
	return isMatch
}

const User = mongoose.model('Users', userSchema);

module.exports = User;