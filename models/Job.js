const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
	company: {
		type: String,
		required: [true, 'Please provide company name !']
	},
	position: {
		type: String,
		required: [true, 'Please provide job position name !']
	},
  status: {
    type: String,
    enum: {
      values: ['pending', 'interview', 'declined'],
      message: '{VALUE} is not supported',
    },
    default: 'pending'
  },
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user'],
	}
}, { timestamps: true });

const Job = mongoose.model('Jobs', jobSchema);

module.exports = Job;