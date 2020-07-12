import { EntityRepository, Repository } from 'typeorm';
import { User, IUser } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: IUser): Promise<User> {
    return this.create(user).save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
