require('dotenv').config();
require('express-async-errors');
const express = require('express');


// routes
const authRoute = require('./routes/auth');
const jobRoute = require('./routes/job');


// middlewares
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const authenticateUser = require('./middlewares/authenticate');


const connectToDB = require('./db/main');


const app = express();
const port = process.env.port || 5000;


app.use(express.json());


app.use('/auth', authRoute);
app.use('/job', authenticateUser, jobRoute);


app.use(notFound);

app.use(errorHandler);



const start = async() => {
	try {
		await connectToDB(process.env.MONGO_URI);
		console.log('db connected');
		app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
	} catch (error) {
		console.log("error", err);
	}
}



start()

