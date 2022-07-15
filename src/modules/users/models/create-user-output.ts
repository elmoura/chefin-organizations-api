import { IUser } from '@common/entities/interfaces/user';
import { LoginUserOutput } from './login-user.output';

export class CreateUserOutput implements Omit<IUser, 'password'> {
  userId: string;

  auth: LoginUserOutput;

  organizationId: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;
}
