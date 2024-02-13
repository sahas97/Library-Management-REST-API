//db config.js
const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(DB);
    } catch (error) {
        console.log('Connection not Success!', error);
        throw new Error("canot connect to database: ", error);
    }
}

// for security disconnect databse from ther server
async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("databse disconnected.");
    } catch (error) {
        throw new Error("canot disconnect from database.");
    }
}

//exports funtctions
module.exports = { connectToDatabase, disconnectFromDatabase }