import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { IUser } from '@common/entities/interfaces/user';
import { User } from '@common/entities/user.entity';
import { DATASOURCE_PROVIDER } from '@modules/database/database.module';
import {
  IUserDataSource,
  IUserLoginParams,
} from './types/user-datasouce.interface';

@injectable()
export class UserDataSource implements IUserDataSource {
  private userRepository: Repository<User>;

  constructor(@inject(DATASOURCE_PROVIDER) dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async createOne(payload: Omit<IUser, 'id'>): Promise<IUser> {
    return this.userRepository.save(payload);
  }

  async findById(userId: string): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { userId },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async updateOne(
    userId: string,
    payload: Partial<IUser>
  ): Promise<Partial<IUser>> {
    return this.userRepository.save({
      ...payload,
      id: userId,
    });
  }

  async findByEmailAndPassword({
    email,
    password,
  }: IUserLoginParams): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { email, password },
    });
  }
}
