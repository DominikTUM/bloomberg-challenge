import {Column, Entity, PrimaryColumn} from 'typeorm';
import exchangeDataSource from './exchange-data-source';

@Entity('Matches')
class Match {
  @PrimaryColumn()
    matchId: number;

  @Column()
    security: string;

  @Column()
    qty: number;

  @Column()
    price: string;

  @Column()
    seller: number;

  @Column()
    buyer: number;
}

export const matches =
  async () => (await exchangeDataSource()).getRepository(Match);
export default Match;
