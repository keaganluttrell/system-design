const { Client } = require('pg');

const cart = new Client({
  host: 'localhost',
  database: 'cart',
});
cart.connect();

module.exports = {
  cart,
};
