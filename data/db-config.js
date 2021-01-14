const knex = require('knex'); // to make sql queries using javascript

const config = require('../knexfile.js'); // different configs for different envs



module.exports = knex(config.development); // choose env and call kenx with the right config
