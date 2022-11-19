import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import Bookkeeping from "./bookkeeping";
import exchangeDataSource from "./exchange-data-source";
import Match from "./match";
import crypto from 'crypto';

const matchSelector = () => Match;
export enum Role { USER = "user", ADMIN = "admin" };

@Entity()
class User {
  @PrimaryColumn()
  userId: number;

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.ADMIN]
  })
  roles: Role[]

  @OneToMany(() => Bookkeeping, user => user)
  bookEntries: Bookkeeping[]

  @OneToMany(matchSelector, match => match.buyer)
  buys: Match[]

  @OneToMany(matchSelector, match => match.seller)
  sells: Match[]

  public set setPassword(password: string) {
    this.password = crypto.createHash('sha256').update(`${password}${this.userId}`).digest('hex');
  }

  public validatePassword(password: string) {
    return crypto.createHash('sha256').update(`${password}${this.userId}`).digest('hex') === this.password
  }

}

export const users = exchangeDataSource.getRepository(User);
export default User;