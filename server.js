const express = require('express');
const fs = require('fs');
const path = require('path');
const termData = require('./db/db.json');
const uuid4 = require('uuid');

//create an epxress server
const app = express();
//create a port number for the server to run off of 
const PORT = 3001;

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//holding CSS, JS and HTML files in a static middleware function in express.
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))

);

//getting the data from db.json. running an if statement to return either a true of false value. 
//Research for later. Can I make a ternary operator from the below if statment

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        // (err, data) ? err(console.log('Error with reading /api/notes')) : data(return res.json(JSON.parse(data));
        if (err) {
            console.log('Error with reading /api/notes');
        } else {
            return res.json(JSON.parse(data));
        }
    // console.log('dis success', fs.readFile);
    })
});

app.get('*', (req, res) => {
    res.send(
    `Have another crack at the note taking <a href="http://localhost:${PORT}/">http://localhost:${PORT}/</a>`
    );
      // Show the user agent information in the terminal
    console.info(req.rawHeaders);

    // Log our request to the terminal
    console.info(`${req.method} request received`);

});

//Posting new note 
app.post('/api/notes', (req, res) => {

    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
    
    // // Log request to the terminal
    console.info(`${req.method} request received`);

    var {title, text} = req.body;

    //create fields for the data base to fill in. UUID so if db has a unique identifier
    if ( title && text) {
        const newNote = {
            title, 
            text, 
            id: uuid4()
        }
      // Prepare a response object to send back to the client
        let responseNote = {
            body: newNote,
            status: 202,
        }
        console.log(responseNote);
        res.status("Success")
        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.log('Error: New note post')
            } else {
                console.log("success mama")
            }
        })
    }

});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

