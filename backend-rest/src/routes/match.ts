import bodyParser from 'body-parser';
import express from 'express';
import {AuthorizedUser} from 'common';
import {matches} from '../models';
import {Role} from '../models/user';
import Match from '../models/match';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/match', async (req, res) => {
  const {id, role} = req.user as AuthorizedUser;
  let queriedMatches: Match[];
  if (role === Role.ADMIN) {
    queriedMatches = await matches().find();
  } else {
    queriedMatches = await matches().find({where: [
      {sellerId: id}, {buyerId: id},
    ]});
  }

  res.status(200).send(queriedMatches);
});

export default app;
