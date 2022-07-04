import { injectable } from 'inversify';
import { User } from '../../../entities/implementations/user.entity';
import {
  IUserDataSource,
  IUserLoginParams,
} from '../types/user-datasouce.interface';
import { MOCKED_ORGANIZATION } from '../../organizations/__mocks__/organization.datasource';

export const MOCKED_USER: User = {
  id: 'ashusahuasuhas',
  organizationId: MOCKED_ORGANIZATION.id || 'oi',
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
      id: userId,
    };
  }

  async createOne(payload: Omit<User, 'id'>): Promise<User> {
    return {
    id: MOCKED_USER.id,
      ...payload,
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
      id: userId,
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
