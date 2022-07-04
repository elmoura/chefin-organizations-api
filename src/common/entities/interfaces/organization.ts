import { IBaseEntity } from './base-entity';
import { IOrganizationLocation } from './organization-location';

export interface IOrganization extends IBaseEntity {
  id: string;

  name: string;

  organizationRepresentantId: string;

  businessSegment: string;

  locations: IOrganizationLocation[];
}
