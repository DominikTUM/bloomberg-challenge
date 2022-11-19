import bodyParser from 'body-parser';
import express from 'express';
import CreateOrderCommand from '../commands/create-order-command';
import {bookkeepings, users} from '../models';
import Bookkeeping from '../models/bookkeeping';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.post('/order', async (req, res) => {
  const {id} = req.user;
  const order = req.body as CreateOrderCommand;

  const user = await users().findOneBy({userId: id});
  if (!user) {
    res.status(400).send(`User ${id} not found`);
  }

  const entry = new Bookkeeping();
  entry.operation = order.operation;
  entry.price = order.price;
  entry.qty = order.qty;
  entry.security = order.security;
  entry.side = order.side;
  entry.userId = id;

  bookkeepings().save(entry);

  // TODO: call python API

  res.status(201).send('Successfully added order');
});

export default app;
