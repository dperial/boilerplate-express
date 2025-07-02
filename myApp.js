let express = require('express');
let app = express();
// Get Method to log "Hello Express" in the console"
app.get('/', (req, res) => {
    console.log("Hello Express"); // Log Hello Express in the console
    // Send a response to the client
    res.send("Hello Express");
});


































 module.exports = app;
