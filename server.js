const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log(`Ready on localhost:${port}!`));

// Mad Lib form submission handler
server.post('/ITC505/lab-7', (req, res) => {
    const { planet, alienName, spaceVehicle, emotion, cosmicItem } = req.body;
    console.log(req.body);
    // Validate if all fields are filled
    if (!planet || !alienName || !spaceVehicle || !emotion || !cosmicItem) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields.</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // Generate the mad lib story
    const madLib = `
        In a ${planet} galaxy far beyond, a brave ${alienName} embarked on a mission to ${spaceVehicle} ${emotion}.
        During their journey, they encountered a mysterious ${cosmicItem} floating in the void,
        containing ${cosmicItem} that unlocked the secrets of the universe!
    `;

    // Return the mad lib story as HTML
    res.send(`
        <h1>Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another Space Adventure Mad Lib story</a>
    `);
});
