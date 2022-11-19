import {Express, Request, Response} from 'express';
import cors from 'cors';
import authenticate from './middleware/authentication';

import authentication from './routes/authentication';
import order from './routes/order';
import match from './routes/match';
import bookkeeping from './routes/bookkeeping';
import user from './routes/user';


const corsOptions = {
  origin: '*',
};

export default function initApi(app: Express) {
  app.use(cors(corsOptions));

  // Setup authentication middleware
  app.use(authenticate);

  // define a route handler for the default home page
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
  });

  app.get('/helloAuth', (req: Request, res: Response) => {
    res.send('Hello ' + req.user.email);
  });

  app.get('/', (req, res) => {
    res.send('Bloomberg Exchange. All rights reserved.');
  });

  // Setup endpoints
  app.use(authentication);
  app.use(order);
  app.use(match);
  app.use(bookkeeping);
  app.use(user);
};
