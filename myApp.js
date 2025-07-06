let express = require('express');
const path = require('path');
require('dotenv').config();

let app = express();
// Build a simple logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`); // Log the request method, path, and IP address
    next(); // Call the next middleware in the stack
});

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Add a route to serve the index.html fil
app.get('/', (req, res) => {
    console.log("Hello Express"); // Log Hello Express in the console
    // Send a HTML file to the client
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

// Simple API endpoint to return a JSON object
app.get('/json', (req, res) => {
    // Check the environment variable MESSAGE_STYLE
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ message: "HELLO JSON" }); // Return a JSON object UPPERCASE
    } else {
        res.json({ message: "Hello json" }); // Return a JSON object
    }
});
// Middleware to create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString(); // Add a time property to the request object
    next(); // Call the next middleware in the stack
}, (req, res) => {
    res.json({ time: req.time }); // Return the time in a JSON object
});
// Build a route to echo the request parameters
app.get('/:word/echo', (req, res) => {
    const { word } = req.params; // Extract the word from the request parameters
    res.json({ echo: word }); // Return the word in a JSON object
});
module.exports = app;
