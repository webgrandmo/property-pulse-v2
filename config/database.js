import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
	mongoose.set('strictQuery', true);

	// If connected don't connect again
	if (connected) {
		console.log('MongoDB is already connected');
		return;
	}

	// Connect to DB
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		connected = true;
	} catch (error) {
		console.log('Something went wrong', error);
	}
};

export default connectDB;
