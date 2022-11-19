import bodyParser from 'body-parser';
import express from 'express';
import {AuthorizedUser} from 'common';
import {bookkeepings, matches} from '../models';
import {Role} from '../models/user';
import Match from '../models/match';
import {FindManyOptions} from 'typeorm';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/match', async (req, res) => {
  const {id, role} = req.user as AuthorizedUser;
  let queriedMatches: Match[];
  const pagingAndOrder : FindManyOptions<Match> = {
    order: {
      matchId: 'DESC',
    },
    take: 20,
    skip: parseInt(<string>req.query.page || '0', 10) * 20};

  const matchesCollection = await matches();
  if (role === Role.ADMIN) {
    queriedMatches = await matchesCollection.find(pagingAndOrder);
  } else {
    queriedMatches = await matchesCollection.find({where: [
      {sellerId: id}, {buyerId: id},
    ], ...pagingAndOrder});
  }

  res.status(200).send(queriedMatches);
});

export default app;
