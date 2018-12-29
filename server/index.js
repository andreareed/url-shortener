require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./pg-client');
const generateId = require('./id-util');

//App Setup
const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

//Database Setup
client.connect();
client.query(
  'CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url TEXT NOT NULL, unique_id TEXT UNIQUE NOT NULL);'
);

// Endpoints
app.post('/getShortUrl', async (req, res) => {
  const { url } = req.body;
  const uniqueId = await generateId();
  const { rows } = await client.query(
    `INSERT INTO urls (url, unique_id) VALUES ('${url}', '${uniqueId}') RETURNING *;`
  );
  res.status(200).json(rows[0]);
});

app.get('/:uniqueId', async (req, res) => {
  const { uniqueId } = req.params;
  const { rows } = await client.query(`SELECT * FROM urls WHERE unique_id = '${uniqueId}'`);
  res.redirect(rows[0].url);
});

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//Shhh Listen...
app.listen(9000, () => console.log(`Up and running on port 9000`));
