import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import authenticate from './middleware/authentication';

import authentication from './routes/authentication';

dotenv.config();

const corsOptions = {
    origin: '*'
}

const app: Express = express();

app.use(cors(corsOptions))

// Setup authentication middleware
app.use(authenticate)

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.get("/helloAuth", (req: Request, res: Response) => {
    res.send("Hello " + req.user.email);
});

app.get('/', (req, res) => {
    res.send('Bloomberg Exchange. All rights reserved.');
});

// Setup endpoints
app.use(authentication);
