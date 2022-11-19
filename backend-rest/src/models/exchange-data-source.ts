import { DataSource } from "typeorm";
import Bookkeeping from "./bookkeeping";
import Match from "./match";
import User from "./user";

export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ''),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Bookkeeping, Match, User],
  subscribers: [],
  migrations: [],
})