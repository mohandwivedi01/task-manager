import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js";

const dbConnection = async () => {
    try {
        const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connInstance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to ${DB_NAME} database: ${error.message}`);
        process.exit(1); //process is the reference of current process
    }
}

export default dbConnection;