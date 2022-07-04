import { IUser } from '@common/entities/interfaces/user';

export class CreateUserOutput implements IUser {
  id: string;

  organizationId: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
