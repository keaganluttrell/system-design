const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/cart'); // Example for postgres

sequelize.authenticate()
  .then(() => console.log('connected'))
  .catch((e) => console.log(e));

module.exports = {
  sequelize,
};
