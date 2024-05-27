const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listing');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/TravelTrekker')
    .then(() => console.log('Connected to DataBase'))
    .catch(err => console.log(err));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded data and override HTTP methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.send(`I'm working on it`);
});

// Route to display all listings
app.get('/listings', async (req, res) => {
    const allListOfDestination = await Listing.find({});
    res.render('index', { allListOfDestination });
});

// Route to show the form for a new listing
app.get('/listings/new', (req, res) => {
    res.render('newList');
});

// Route to display a specific listing by ID
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    res.render('show', { listing });
});

// Route to show the edit form for a specific listing by ID
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    res.render('edit', { listing });
});

// Route to update a specific listing by ID
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const updatedListing = req.body.listing;
    await Listing.findByIdAndUpdate(id, updatedListing, { new: true });
    res.redirect(`/listings/${id}`);
});

// Route to delete a specific listing by ID
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

// Route to create a new listing
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
