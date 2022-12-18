const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

// Port will be either 8000 or environment specified in the config.
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();





