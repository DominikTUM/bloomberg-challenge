import bodyParser from 'body-parser';
import express from 'express';
import {AuthorizedUser} from 'common';
import {bookkeepings} from '../models';
import {Role} from '../models/user';
import Bookkeeping from '../models/bookkeeping';
import {FindManyOptions} from 'typeorm';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/bookkeeping', async (req, res) => {
  const {id, role} = req.user as AuthorizedUser;
  let queriedBookkeepings: any[];
  const pagingAndOrder : FindManyOptions<Bookkeeping> = {
    order: {
      orderId: 'DESC',
    },
    take: 20,
    skip: parseInt(<string>req.query.page || '0', 10) * 20,
  };
  const bookkeepingCollection = await bookkeepings();
  if (role === Role.ADMIN) {
    queriedBookkeepings = await bookkeepingCollection.find();
  } else {
    queriedBookkeepings = await bookkeepingCollection
        .findBy({userId: id, ...pagingAndOrder});
  }

  res.status(200).send(queriedBookkeepings);
});

export default app;
