import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import exchangeDataSource from './exchange-data-source';

export type Operation = 'add' | 'del';
export type Side = 'buy' | 'sell';

@Entity('Bookkeeping')
class Bookkeeping {
  @PrimaryGeneratedColumn()
    orderId: number;

  @Column()
    operation: string;

  @Column()
    side: string;

  @Column()
    security: string;

  @Column()
    qty: number;

  @Column()
    price: number;

  @Column()
    userId: number;
}

export const bookkeepings =
  async () => (await exchangeDataSource()).getRepository(Bookkeeping);
export default Bookkeeping;
