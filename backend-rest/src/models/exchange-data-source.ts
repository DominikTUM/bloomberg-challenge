import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
import Bookkeeping from './bookkeeping';
import Match from './match';
import User from './user';

dotenv.config();

export default () => new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Match, User, Bookkeeping],
  subscribers: [],
  migrations: [],
}).initialize();
