const express = require('express');
require('dotenv').config()
const auth = require('./routes/auth');
const db = require('./database/db-config')

// Create server
const app = express();


// Allow read and write in json
app.use(express.json());

// Auth route
app.use('/api/user', auth)

// Database
app.use('/users', db)

// Starting the server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
})