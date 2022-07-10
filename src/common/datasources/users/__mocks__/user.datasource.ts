import { injectable } from 'inversify';
import { User } from '../../../entities/user.entity';
import {
  IUserDataSource,
  IUserLoginParams,
} from '../types/user-datasouce.interface';
import { MOCKED_ORGANIZATION } from '../../organizations/__mocks__/organization.datasource';

export const MOCKED_USER: User = {
  userId: 'ashusahuasuhas',
  organizationId: MOCKED_ORGANIZATION.organizationId,
  email: 'yumoto@paidoseufilho.com',
  firstName: 'Gustavo',
  lastName: 'Yumoto',
  password: 'xesquedelebrelelele',
  phoneNumber: '1399999999',
  createdAt: new Date(),
  updatedAt: new Date(),
};

@injectable()
export class UserDataSource implements IUserDataSource {
  async updateOne(
    userId: string,
    payload: Partial<User>
  ): Promise<Partial<User>> {
    return {
      ...payload,
      userId,
    };
  }

  async createOne(payload: Omit<User, 'id'>): Promise<User> {
    return {
      ...payload,
      userId: MOCKED_USER.userId,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return {
      ...MOCKED_USER,
      email,
    };
  }

  async findById(userId: string): Promise<User | null> {
    return {
      ...MOCKED_USER,
      userId,
    };
  }

  async findByEmailAndPassword({
    email,
    password,
  }: IUserLoginParams): Promise<User | null> {
    return {
      ...MOCKED_USER,
      email,
      password: 'not a real password',
    };
  }
}
