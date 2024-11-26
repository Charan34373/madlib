const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Route to generate a random space fact
server.get('/space_fact', (req, res) => {
    const facts = [
        "A day on Venus is longer than a year on Venus!",
        "Jupiter has over 80 moons!",
        "Mars has the largest volcano in the solar system.",
        "The Sun accounts for 99.86% of the mass in the solar system.",
        "Neutron stars can spin 600 times per second!"
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.send(`Did you know? ${randomFact}`);
});

// Serve static files from "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log(`Space Adventure server ready on localhost:${port}!`));

// Space Adventure Mad Lib form submission handler
server.post('/space-adventure/game', (req, res) => {
    const { planet, alienName, spaceVehicle, emotion, cosmicItem } = req.body;

    if (!planet || !alienName || !spaceVehicle || !emotion || !cosmicItem) {
        res.send(`
            <h1>Mission Failed</h1>
            <p>It seems you forgot to fill out some critical mission details.</p>
            <a href="/space-adventure/index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
        On a distant journey to ${planet}, Captain ${alienName} boarded their ${spaceVehicle} filled with ${emotion}.
        Along the way, they discovered a rare ${cosmicItem}, which became the key to saving their galaxy!
    `;

    res.send(`
        <h1>Space Adventure Story</h1>
        <p>${madLib}</p>
        <a href="/space-adventure/index.html">Create Another Space Adventure</a>
    `);
});
