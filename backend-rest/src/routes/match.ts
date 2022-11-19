import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import express from 'express';
import { AuthorizedUser } from 'common';
import { matches } from '../models';
import {Role} from '../models/user';
import Match from '../models/match';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/match', async (req, res) => {
    const { id, roles } = req.user as AuthorizedUser;
    let queriedMatches: Match[];
    if (roles.includes(Role.ADMIN)) {
        queriedMatches = await matches.find();
    } else {
        queriedMatches = await matches.find({where: [
            {seller: {id}}, {buyer: {id}}
        ]})
    }

    return queriedMatches;
})

export default app;