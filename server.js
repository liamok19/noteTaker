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

app.get('*', (req, res) =>
    res.send(
    `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
    )
);

app.get('/api/terms', (req, res) => res.json(termData));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);