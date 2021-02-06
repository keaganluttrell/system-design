const { Pool } = require('pg');

const cart = new Pool({
  host: 'localhost',
  database: 'cart',
});
cart.connect();

module.exports = {
  cart,
};
