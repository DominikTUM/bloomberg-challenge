import bodyParser from 'body-parser';
import express from 'express';
import User, {Role, users} from '../models/user';
import CreateUserCommand from '../commands/create-user-command';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.post('/register', async (req, res) => {
  const {email, password, name} = req.body as CreateUserCommand;
  const user = new User();
  user.email = email;
  user.setPassword = password;
  user.name = name;
  user.role = Role.USER;

  await (await users()).save(user);
  res.status(201).send('User created');
});

export default app;
