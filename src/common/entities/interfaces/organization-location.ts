import { ICustomBaseEntity } from './custom-base-entity';

export interface IOrganizationLocation extends ICustomBaseEntity {
  locationId: string;

  locationName: string;

  city: string;

  state: string;

  neighborhood: string;

  street: string;

  number: string;

  complement: string;

  postalCode: string;
}
