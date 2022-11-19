import dotenv from 'dotenv';
import express from 'express';
import initApi from './api-init';

dotenv.config();

console.log('DB connection initialized');

const app = express();

initApi(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Connected`);
});
