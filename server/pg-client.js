const pg = require('pg');
const client = new pg.Client(process.env.CONNECTION_STRING);

module.exports = client;
