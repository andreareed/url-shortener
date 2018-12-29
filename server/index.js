//Imports
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

//App Setup
const app = express();
app.use(bodyParser.json());

const client = new pg.Client(process.env.CONNECTION_STRING);
client.connect();

client.query(
  'CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url TEXT NOT NULL, short_id TEXT NOT NULL);'
);

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//Shhh Listen...
app.listen(9000, () => console.log(`Up and running on port 9000`));
