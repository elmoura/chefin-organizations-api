import { IBaseEntity } from './base-entity';

export interface IUser extends IBaseEntity {
  id: string;

  organizationId: string;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  password: string;
}
