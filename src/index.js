const express = require('express');
require('dotenv').config()
const auth = require('./routes/auth');
const user = require('./routes/user');
const book = require('./routes/book');
const itinerary = require('./routes/itinerary');
const group = require('./routes/group');

// Create server
const app = express();


// Allow read and write in json
app.use(express.json());

// Auth route
app.use('/app/auth', auth)

// Database
app.use('/app/users', user)
app.use('/app/books', book)
app.use('/app/itineraries', itinerary)
app.use('/app/groups', group)


// Starting the server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})