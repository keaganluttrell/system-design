const express = require('express');
const compression = require('compression');
// const Cart = require('../database/Cart');
const { sequelize } = require('../psql/db');

const app = express();
const port = 3003;

app.use(compression());
app.use(express.static('public'));

app.get('/api/item/:itemID', (req, res) => {
  //   Cart.CartModel.findById(req.params.itemID)
  //     .then((result) => res.send(result))
  //     .catch((err) => res.send(err));
  // });

  // app.get('/api/x/1', (req, res) => {
  sequelize.query(`select * from data where _id = ${req.params.itemID}`)
    .then((item) => {
      console.log(item[0][0].doc.shipping.origin);
      res.send(item[0][0].doc);
    })
    .catch((e) => res.send(e));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
