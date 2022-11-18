import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import express from 'express';
import config from '../configuration.json';
import { AuthorizedUser } from 'common';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', async (req, res) => {
    const {email, password} = req.body;
  
    // Query user
    
    // Validate user password
    if (true) {

            const authUser : AuthorizedUser = {
             _id: 'TODO'
            };

            const token = jwt.sign(authUser, config.accessTokenSecret);
            res.json({ jwt: token });

    } else {
        res.status(401).send('Invalid credentials.');
    }
})

export default app;