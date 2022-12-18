const planets = require('../../models/planets.model');

function getAllPlanets(req, res) {
    // Value is returned just so function only runs once.
    // Return value is never used.
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
};