

class CustomError extends Error {
	constructor(message, status) {
    super(message);
    this.status = status;
  }
}


const createCustomError = (msg, status) => {
	return new CustomError(msg, status);
}


module.exports = {
	CustomError,
	createCustomError
}