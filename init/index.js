// getting-started.js

// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Import initial data to seed the database
const initData = require('data.js');
// Import the Listing model
const Listing = require('listing.js');

// Main function to connect to the database
main()
    .then(() => {
        console.log('Connected to DataBase');
    })
    .catch(err => console.log(err));  // Catch and log any connection errors

// Async function to connect to the MongoDB database
async function main() {
    // Connect to the MongoDB database running locally on port 27017
    await mongoose.connect('mongodb://127.0.0.1:27017/TravelTrekker');

    // Uncomment and use the below line if your database requires authentication
    // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/TravelTrekker');
}

// Async function to initialize the database with initial data
const initDB = async () => {
    try {
        // Delete all existing documents in the Listing collection
        await Listing.deleteMany({});
        // Insert initial data into the Listing collection
        await Listing.insertMany(initData.data);
        console.log('Database initialization complete');
    } catch (err) {
        console.log('Error initializing database:', err);
    }
};

// Call the initDB function to seed the database with initial data
initDB();
