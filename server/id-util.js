const crypto = require('crypto');
const client = require('./pg-client');

const generateShortId = async (bytes = 3, numberOfIds = 25) => {
  let potentialShortIds = [];

  for (let i = 0; i < numberOfIds; i++) {
    potentialShortIds.push(crypto.randomBytes(bytes).toString('hex'));
  }
  const { rows } = await client.query(
    `SELECT * FROM urls WHERE unique_id = ANY('{${potentialShortIds}}')`
  );
  const remainingIds = potentialShortIds.filter(id => rows.indexOf(id) < 0);

  if (!remainingIds.length) {
    throw new Error('Unable to generate unique ID');
  }

  const randomIndex = Math.floor(Math.random() * remainingIds.length);

  return remainingIds[randomIndex];
};

module.exports = generateShortId;
