import { ICustomBaseEntity } from './custom-base-entity';
import { IOrganizationLocation } from './organization-location';

export interface IOrganization extends ICustomBaseEntity {
  organizationId: string;

  name: string;

  organizationRepresentantId: string;

  businessSegment: string;

  locations: IOrganizationLocation[];
}
