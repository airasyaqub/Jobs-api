
const Job = require('../models/Job');

const { CustomError, createCustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');





const getAllJobs = async (req, res) => {
	const userID = req.user.id;
	let jobs = await Job.find({
		createdBy: userID
	});
	jobs = jobs.map((e) => {
		return {
			status: e.status,
			company: e.company,
			position: e.position,
			id: e._id
		}
	})
	res.status(StatusCodes.OK).send({ status: 'success', data: jobs});
}

const createJob = async (req, res) => {
	const {
		company,
		position,
	} = req.body;
	if (company && position) {
		req.body.createdBy = req.user.id;
		const createdJob = await Job.create(req.body);
		const {
			status,
			company,
			position,
			_id
		} = createdJob;
		res.status(StatusCodes.CREATED).send({ status: 'success', data: {
			status,
			company,
			position,
			id:_id
		}});
	} else {
		throw createCustomError(`Please provide company name & position !`, StatusCodes.BAD_REQUEST);
	}
}

const getJob = async (req, res) => {
	const userID = req.user.id;
	let job = await Job.findOne({
		createdBy: userID,
		_id:  req.params.id
	});
	if (job) {
		job = {
			status: job.status,
			company: job.company,
			position: job.position,
			id: job._id
		}
		res.status(StatusCodes.OK).send({ status: 'success', data: job});
	} else {
		res.status(StatusCodes.OK).send({ status: 'success', data: null});
	}

}

const updateJob = async (req, res) => {

	const userID = req.user.id;

	const status = req.body.status;

	if (status) {

		let updatedJob = await Job.findOneAndUpdate({
			createdBy: userID,
			_id:  req.params.id
		}, { status }, {
			new: true,
			runValidators: true
		});

		if (!updatedJob) {
			throw createCustomError(`No job found with given ID`, StatusCodes.NOT_FOUND);
		}

		res.status(StatusCodes.OK).send({ status: 'success', data: {
			company: updatedJob.company,
			position: updatedJob.position,
			status: updatedJob.status,
			id: updatedJob._id,
		}});

	} else {
		throw createCustomError(`Provide status to update !`, StatusCodes.BAD_REQUEST);
	}
}



const deleteJob = async (req, res) => {
	const userID = req.user.id;
	let job = await Job.findOneAndDelete({
		createdBy: userID,
		_id:  req.params.id
	});
	if (!job) {
		throw createCustomError(`No job found with given id: ${req.params.id}`, StatusCodes.NOT_FOUND);
	}

	res.status(StatusCodes.OK).send({ status: 'success', message: `${req.params.id} job deleted` });
}




module.exports = {
	getAllJobs,
	createJob,
	getJob,
	updateJob,
	deleteJob
}