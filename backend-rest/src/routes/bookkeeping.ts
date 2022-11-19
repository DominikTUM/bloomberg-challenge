import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import express from 'express';
import { AuthorizedUser } from 'common';
import { bookkeepings } from '../models';
import {Role} from '../models/user';
import Bookkeeping from '../models/bookkeeping';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/bookkeeping', async (req, res) => {
    const { id, roles } = req.user as AuthorizedUser;
    let queriedMatches: Bookkeeping[];
    if (roles.includes(Role.ADMIN)) {
        queriedMatches = await bookkeepings.find();
    } else {
        queriedMatches = await bookkeepings.find({where: {user: {id}}});
    }

    res.status(200).send(queriedMatches);
})

export default app;