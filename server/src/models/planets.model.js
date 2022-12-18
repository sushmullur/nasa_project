// Sush Mullur
// Created 07/18/22
// Last modified 07/18/22
// This mini-project was completed for the Udemy Node JS course.
// This simple NodeJS program reads a CSV file containing data about planets
// as observed from the Kepler telescope, and checks through conditions to determine
// if any planets are habitable by humans based on several conditions.


// CSV parser module used for parsing the kepler csv data file.
const { parse } = require('csv-parse');

// File system module used for creating a read stream of the csv file.
const fs = require('fs');
const path = require('path');


// Array used to store potentially habitable planets. 
const habitablePlanets = [];

// Checks whether a planet is habitable based on a few criteria.
// Returns a boolean indicating the habitability of the planet.
function isHabitablePlanet(planet) {
    // Test 1: Planet is confirmed to exist.
    return planet['koi_disposition'] === 'CONFIRMED'
    // Test 2: Planet receives the right amount of light from the nearby star.
    && planet['koi_insol'] > 0.33 && planet['koi_insol'] < 1.11
    // Test 3: Planet is not too large, resulting in a gas or ice giant.
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
// Creates a read stream of the CSV file containing planet data.
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        // Pipes the read stream into the CSV parser.
        .pipe(parse({
            // Instructs that '#' characters are comments, and the structures are columns.
            comment: '#', 
            columns: true, 
        }))
        // If a candidate planet meets habitability conditions, it is pushed to the array. 
        .on('data', (data) => {
            if(isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        // Error handling.
        .on('error', (err) => {
            console.log(err);
            reject(err);
            
        })
        // The number and name of planets are logged upon completion.
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    });
}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets,
};