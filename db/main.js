
const mongoose = require("mongoose");



const connectToDB = (connectionURL) => {
	return mongoose.connect(connectionURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
}


module.exports = connectToDB;

