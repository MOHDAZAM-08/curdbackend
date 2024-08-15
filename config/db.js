const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this line is at the top

const uri = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exiting process on connection failure
    }
}

module.exports = connectDB;
