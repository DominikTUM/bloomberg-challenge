import {Column, Entity, PrimaryColumn} from 'typeorm';
import exchangeDataSource from './exchange-data-source';
import crypto from 'crypto';

export enum Role { USER = 'user', ADMIN = 'admin' };

@Entity('User')
class User {
  @PrimaryColumn()
    userId: number;

  @Column()
    email: string;

  @Column()
    name: string;

  @Column()
    password: string;

  @Column('text')
    role: Role;

  public set setPassword(password: string) {
    console.log(this.userId);
    this.password = crypto.createHash('sha256')
        .update(`${password}${this.userId}`).digest('hex');
  }

  public validatePassword(password: string) {
    return crypto.createHash('sha256')
        .update(`${password}${this.userId}`).digest('hex')
        .toLowerCase() === this.password.toLowerCase();
  }
}

export const users =
  async () => (await exchangeDataSource()).getRepository(User);
export default User;
