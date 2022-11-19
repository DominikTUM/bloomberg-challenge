import {Column, Entity, PrimaryColumn} from 'typeorm';
import exchangeDataSource from './exchange-data-source';

@Entity('Match')
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
    sellerId: number;

  @Column()
    buyerId: number;
}

export const matches = () => exchangeDataSource.getRepository(Match);
export default Match;
