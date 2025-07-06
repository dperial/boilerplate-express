let express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies

let app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser middleware
app.use(bodyParser.json()); // Use body-parser middleware

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

// Receive a POST request at /name and respond with a JSON object containing the first and last name
app.route('/name')
    .get((req, res) => {
        const { first: firstName, last: lastName } = req.query; // Extract first and last name from the query parameters
        res.json({ name: `${firstName} ${lastName}` }); // Return the full name in a JSON object
    })
    .post((req, res) => {
        const { first: firstName, last: lastName } = req.body; // Extract first and last name from the request body
        res.json({ name: `${firstName} ${lastName}` }); // Return the full name in a JSON object
 });
module.exports = app;
