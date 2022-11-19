import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import express from 'express';
import config from '../configuration.json';
import {AuthorizedUser} from 'common';
import {users} from '../models';
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.post('/auth', async (req, res) => {
  const {email, password} = req.body;

  // Query user
  const user = await (await users()).findOneBy({email});
  if (!user) {
    res.status(401).send('User not found.');
    return;
  }
  // Validate user password
  if (!user.validatePassword(password)) {
    const authUser : AuthorizedUser = {
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(authUser, config.accessTokenSecret);
    res.json({jwt: token});
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

export default app;
