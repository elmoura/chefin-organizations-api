import { IUser } from '@common/entities/interfaces/user';

export class CreateUserOutput implements Omit<IUser, 'password'> {
  userId: string;

  organizationId: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;
}
