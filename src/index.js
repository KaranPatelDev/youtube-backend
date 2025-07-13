// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


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