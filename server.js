const express = require('express');
const fs = require('fs');
const path = require('path');
var termData = require('./db/db.json');
const {v4: uuid4} = require('uuid');

//create an epxress server
const app = express();
//create a port number for the server to run off of 
const PORT = process.env.PORT || 3001;

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

// Posting new note 
app.post('/api/notes', (req, res) => {
    // // Show the user agent information in the terminal
    // console.info(req.rawHeaders);
    
    // // Log request to the terminal
    console.log(`${req.method} request received`);

    //adding field vairables to the body. 
    const {title, text} = req.body;
    // console.log(req.body);
    // const bodyNote = req.body;
    // let title = bodyNote.title;
    // let text = bodyNote.text;

    //create fields for the data base to fill in. UUID so if db has a unique identifier
    //throw err catch**** TO DO 
    if (title && text) {
                const newNote = {
                    title, 
                    text,
                    id: uuid4(),
                }
                // console.log(newNote);
        //success response. 
        res.status(201).json("Success");

        //reading the database file before pushing data.
        fs.readFile('./db/db.json', function (err, data) {

            if (err) {
                console.log('Error with passing new note to Database', err);
            } else {
                const newArray = JSON.parse(data);
                newArray.push(newNote);
                
                fs.writeFile('./db/db.json', JSON.stringify(newArray), err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Note changed");
                    }
                })
            }
        })
    } else {
        res.status(500).json("Error: New Note unsucessful");
    }
    console.log(req.body);

});

app.delete("/api/notes/:id", function(req, res) {
    if(req.query.portfolioId) {
        console.log("Deleting portfolio: " + req.query.portfolioId);
        stockService.deletePortfolio(req.query.portfolioId);
        res.status(200).send({});
    } else {
        res.status(400).send("Please specify a portfolioId");
    }
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

