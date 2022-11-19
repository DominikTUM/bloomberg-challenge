import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import exchangeDataSource from "./exchange-data-source";
import User from "./user";

const userSelector = () => User;
@Entity()
class Match {
  @PrimaryColumn()
  id: number;

  @Column()
  security: string;

  @Column()
  qty: number;

  @Column()
  price: string;

  @ManyToOne(userSelector, user => user.bookEntries)
  seller: User

  @ManyToOne(userSelector, user => user.bookEntries)
  buyer: User
}

export const matches = exchangeDataSource.getRepository(Match);
export default Match;