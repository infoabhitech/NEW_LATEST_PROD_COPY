import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

const dbConnect = async () => {
	try {
		await connect(`${process.env.MONGODB_URI}`);
		// console.log("Connected to MongoDB");
	} catch (error) {
		throw new Error(`Error connecting to MongoDB: ${error.message}`);
	}
};

export default dbConnect;