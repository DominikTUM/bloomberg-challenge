import bodyParser from 'body-parser';
import express from 'express';
import User, {users} from '../models/user';
import CreateUserCommand from '../commands/create-user-command';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const {email, password, name} = req.body as CreateUserCommand;
    const user = new User();
    user.email = email;
    user.setPassword = password;
    user.name = name;

    await users().save(user);
})

export default app;