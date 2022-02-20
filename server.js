const express = require('express');
const path = require('path');

//create an epxress server
const app = express();
//create a port number for the server to run off of 
const PORT = 3001;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//holding CSS, JS and HTML files in a static middleware function in express.
app.use(express.static('public'));

app.get('/index', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) => {
    res.send(
    `Have another crack at the note taking <a href="http://localhost:${PORT}/index">http://localhost:${PORT}/index</a>`
    );
      // Show the user agent information in the terminal
    console.info(req.rawHeaders);

    // Log our request to the terminal
    console.info(`${req.method} request received`);

});


app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    // res.json(`${req.method} request received`);

    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
    
    // // Log our request to the terminal
    // console.info(`${req.method} request received`);

      // Prepare a response object to send back to the client
        let response;

        // Check if there is anything in the response body
        if (req.body && req.body.product) {
            response = {
            status: 'success',
            data: req.body,
            };
            res.json(`Review for ${response.data.product} has been added!`);
        } else {
            res.json('Request body must at least contain a product name');
        }

        // Log the response body to the console
        console.log(req.body);

});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);