import { IBaseEntity } from './base-entity';

export interface IOrganizationLocation extends IBaseEntity {
  locationName: string;

  city: string;

  state: string;

  neighborhood: string;

  street: string;

  number: string;

  complement: string;
}
