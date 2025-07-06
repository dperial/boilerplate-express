let express = require('express');
const path = require('path');
require('dotenv').config();

let app = express();
// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Get Method to log "Hello Express" in the console"
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
})
module.exports = app;
