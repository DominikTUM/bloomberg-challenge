import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthorizedUser } from 'common';
import config from '../configuration.json'

export default function authenticate(req: Request, res: Response, next: () => void) {

    // No authentication if registering or when logging in
    if (req.path.startsWith('/auth') || req.path.startsWith('/register') ) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user as AuthorizedUser;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}