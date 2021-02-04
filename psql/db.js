const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/cart'); // Example for postgres

sequelize.authenticate()
  .then(() => console.log('connected'))
  .catch((e) => console.log(e));

// sequelize.query('select * from data where _id = 1')
//   .then((items) => {
//     console.log(items[0][0].info);
//     sequelize.close();
//   })
//   .catch((e) => console.log(e));

module.exports = {
  sequelize,
};
