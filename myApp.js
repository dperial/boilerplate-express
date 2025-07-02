let express = require('express');
const path = require('path');
let app = express();
// Get Method to log "Hello Express" in the console"
app.get('/', (req, res) => {
    console.log("Hello Express"); // Log Hello Express in the console
    // Send a response to the client
    res.sendFile(path.join(__dirname + "/views/index.html"));
});
// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname , 'public')));
module.exports = app;
