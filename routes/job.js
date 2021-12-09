const express = require('express');

const router = express.Router();


const {
	getAllJobs,
	createJob,
	getJob,
	updateJob,
	deleteJob
} = require ('../controllers/job');



router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);


module.exports = router;