import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import exchangeDataSource from "./exchange-data-source";
import User from "./user";

export type Operation = "add" | "del";
export type Side = "buy" | "sell";

@Entity()
class Bookkeeping {
  @PrimaryColumn()
  orderId: number;

  @Column({
    type: "enum",
    enum: ["del", "add"],
    default: "del"
  })
  operation: Operation;

  @Column({
    type: "enum",
    enum: ["buy", "sell"],
    default: "buy"
  })
  side: Side;

  @Column()
  security: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column("userId")
  @ManyToOne(() => User, user => user.bookEntries)
  user: User
}

export const bookkeepings = exchangeDataSource.getRepository(Bookkeeping);
export default Bookkeeping;