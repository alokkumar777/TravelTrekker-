const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a listing
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,     // Title is required
        minlength: 3,       // Minimum length of 3 characters
        maxlength: 50      // Maximum length of 50 characters
    },
    description: {
        type: String
    },
    image: {
        filename: String,   // Filename of the image
        url: String,        // URL of the image
        // default: "insert-picture-icon.png" // Default image (commented out)
    },
    price: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 0; // Validates that 'price' is a non-negative number
            },
            message: props => `${props.value} is not a valid price!` // Custom error message
        }
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

// Create the Listing model (collection)
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; // Export the Listing model
