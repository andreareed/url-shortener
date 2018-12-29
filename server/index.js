require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./pg-client');
const generateId = require('./id-util');

//App Setup
const app = express();
app.use(bodyParser.json());

//Database Setup
client.connect();
client.query(
  'CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url TEXT NOT NULL, short_id TEXT UNIQUE NOT NULL);'
);

// Endpoint
app.post('/getShortUrl', async (req, res) => {
  const { url } = req.body;
  const short_id = await generateId();
});

// const path = require('path');
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

//Shhh Listen...
app.listen(9000, () => console.log(`Up and running on port 9000`));
