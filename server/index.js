require('newrelic');
const express = require('express');
const compression = require('compression');
const { cart } = require('../psql/db');

const app = express();
const port = 3003;

app.use(compression());
app.use(express.static('public'));

app.get('/api/item/:itemID', (req, res) => {
  const { itemID } = req.params;
  cart.query(`select document from documents where _id = ${itemID}`,
    (err, data) => {
      if (err) {
        res.send(err);
      }
      const doc = { _id: req.params.itemID };
      Object.assign(doc, data.rows[0].document);
      res.send(doc);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
