const express = require('express');
const path = require('path');

const termData = require('./db/db.json');

const app = express();
const PORT = 3001;

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

app.get('/api/db', (req, res) => res.json(dbData));

app.get('/api/db:db', (req, res) => res.json(dbData));

app.post('/api/reviews', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
    
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
    
    // Log our request to the terminal
    console.info(`${req.method} request received`);
    });


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);