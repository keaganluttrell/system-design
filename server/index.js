/* eslint-disable no-underscore-dangle */
const express = require('express');
const compression = require('compression');
// const Cart = require('../database/Cart');
const { sequelize } = require('../psql/db');

const app = express();
const port = 3003;

app.use(compression());
app.use(express.static('public'));

app.get('/api/item/:itemID', (req, res) => {
  sequelize.query(`select document from documents where _id = ${req.params.itemID}`)
    .then((item) => {
      const doc = { _id: req.params.itemID };
      Object.assign(doc, item[0][0].document);
      res.send(doc);
    })
    .catch((e) => res.send(e));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
