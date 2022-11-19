import {Column, Entity, PrimaryColumn} from "typeorm";
import exchangeDataSource from "./exchange-data-source";

export type Operation = "add" | "del";
export type Side = "buy" | "sell";

@Entity()
class Bookkeeping {
  @PrimaryColumn()
  orderId: number;

  @Column('text')
  operation: Operation;

  @Column('text')
  side: Side;

  @Column()
  security: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  userId: number
}

export const bookkeepings = () => exchangeDataSource.getRepository(Bookkeeping);
export default Bookkeeping;