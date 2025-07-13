// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})
//"./env" this should throw error as our path is "./.env" but it is not throwing error because we are using dotenv package which is designed to load environment variables from a .env file into process.env. The path is relative to the current working directory, which is usually the root of your project.

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB!!!!!", err);
})













/*

import { DB_NAME } from './constants';
const app = express();

(async() => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on('error', (err) => {
            console.error("Server error:", err);
            throw err;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
})()
// apply ";" at the start of the line as it is a professional coding practice

*/