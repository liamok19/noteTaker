const fs = require ('fs');

const notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

module.exports = function (app) {
    
    //APP get request. Reading the data from db.json file.
    app.get('/api/notes', (req, res) => {
    
        res.sendFile(path.join(__dirname, 'public/notes.html'))

        // Show the user agent information in the terminal
        console.info(req.rawHeaders);

        // Prepare a response object to send back to the client
        let notesDB = notesData;

        console.log('\r\n GET request - Returning notes data: ' + JSON.stringify(notesDB));

        res.JSON = notesDB
        
    });

    // app.post('/api/notes', (req, res) => {
    //     // Let the client know that their POST request was received
    //     res.json(`${req.method} request received`);

    //     // Show the user agent information in the terminal
    //     console.info(req.rawHeaders);
        
    //     // // Log our request to the terminal
    //     // console.info(`${req.method} request received`);

    //     // Check if there is anything in the response body
    //     if (req.body && req.body.product) {
    //         response = {
    //         status: 'success',
    //         data: req.body,
    //         };
    //         res.json(`Review for ${response.data.product} has been added!`);
    //     } else {
    //         res.json('Request body must at least contain a product name');
    //     }

    //     // Log the response body to the console
    //     console.log(req.body);

// });

};