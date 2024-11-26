const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from "public" directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route to serve the homepage (index.html)
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for Lab 7 Mad Lib form submission
server.post('/itc505/lab-7/submit', (req, res) => {
    const { noun, verb, adjective, place, pluralNoun } = req.body;

    // Check if all fields are filled
    if (!noun || !verb || !adjective || !place || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/itc505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // Generate the Mad Lib story
    const madLib = `Once upon a time in ${place}, a ${adjective} ${noun} decided to ${verb} with some ${pluralNoun}.`;

    // Return the generated story
    res.send(`
        <h1>Submission Successful</h1>
        <p>Your Mad Lib Story:</p>
        <p>${madLib}</p>
        <a href="/itc505/lab-7/index.html">Create Another</a>
    `);
});

// Route for generating a random number
server.get('/do_a_random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates a number between 1 and 100
    res.send(`
        <h1>Random Number</h1>
        <p>Your random number is: <strong>${randomNumber}</strong></p>
        <a href="/">Go Back to Home</a>
    `);
});

// Start the server
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
