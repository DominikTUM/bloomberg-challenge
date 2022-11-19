import bodyParser from 'body-parser';
import express from 'express';
import CreateOrderCommand from '../commands/create-order-command';
import {bookkeepings} from '../models';
import Bookkeeping from '../models/bookkeeping';
import config from '../configuration.json';
import http from 'http';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.post('/order', async (req, res) => {
  const {id} = req.user;
  const {price, qty, side, operation, security} =
    req.body as CreateOrderCommand;

  if (price < 0 || qty < 0) {
    res.status(400).send(`Parameters invalid`);
    return;
  }
  const entry = new Bookkeeping();
  entry.operation = operation;
  entry.price = price;
  entry.qty = qty;
  entry.security = security;
  entry.side = side;
  entry.userId = id;

  await (await bookkeepings()).insert(entry);

  http.get(config.matchingEndpoint + id, console.log);

  res.status(201).send('Successfully added order');
});

export default app;
