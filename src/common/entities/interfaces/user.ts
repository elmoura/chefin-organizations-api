import { ICustomBaseEntity } from './custom-base-entity';

export interface IUser extends ICustomBaseEntity {
  userId: string;

  organizationId: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  password: string;
}
