import { ICustomBaseEntity } from '@common/entities/interfaces/custom-base-entity';
import { IOrganizationLocation } from '@common/entities/interfaces/organization-location';

export const ORGANIZATION_LOCATION_DATASOURCE_PROVIDER =
  'OrganizationLocationDataSource';

type AutoGeneratedFields = keyof ICustomBaseEntity | 'locationId';

export interface IOrganizationLocationDataSource {
  findByOrganizationId(
    organizationId: string
  ): Promise<IOrganizationLocation[]>;
  saveManyForOrganization(
    organizationId: string,
    locations: Omit<IOrganizationLocation, AutoGeneratedFields>[]
  ): Promise<IOrganizationLocation[]>;
}
