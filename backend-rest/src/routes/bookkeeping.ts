import bodyParser from 'body-parser';
import express from 'express';
import {AuthorizedUser} from 'common';
import {bookkeepings} from '../models';
import {Role} from '../models/user';
import Bookkeeping from '../models/bookkeeping';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/bookkeeping', async (req, res) => {
  const {id, role} = req.user as AuthorizedUser;
  let queriedbookkeepings: Bookkeeping[];
  if (role === Role.ADMIN) {
    queriedbookkeepings = await bookkeepings().find();
  } else {
    queriedbookkeepings = await bookkeepings().findBy({userId: id});
  }

  res.status(200).send(queriedbookkeepings);
});

export default app;
