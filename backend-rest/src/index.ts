import dotenv from 'dotenv';
import express from 'express';
import initApi from './api-init';
import ExchangeDataSource from './models/exchange-data-source';

dotenv.config();

ExchangeDataSource.initialize().then(() => {
  console.log('DB connection initialized');

  const app = express();

  initApi(app);

  app.listen(process.env.APP_PORT, () => {
    console.log(`Connected`);
  });
})
    .catch(console.log);
