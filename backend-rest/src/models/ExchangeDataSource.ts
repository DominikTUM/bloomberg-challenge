import { DataSource } from "typeorm";
import Bookkeeping from "./bookkeeping";
import Match from "./match";
import User from "./user";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Bookkeeping, Match, User],
  subscribers: [],
  migrations: [],
})