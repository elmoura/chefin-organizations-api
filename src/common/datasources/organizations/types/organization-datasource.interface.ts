import { ICustomBaseEntity } from '@common/entities/interfaces/custom-base-entity';
import { Organization } from '@common/entities/organization.entity';

type AutoGeneratedOrganizationFields =
  | keyof ICustomBaseEntity
  | 'organizationId';

export interface IOrganizationDataSource {
  findById(organizationId: string): Promise<Organization | null>;
  create(
    payload: Omit<Organization, AutoGeneratedOrganizationFields>
  ): Promise<Organization>;
  updateOne(
    organizationId: string,
    payload: Partial<Organization>
  ): Promise<Partial<Organization>>;
}

export const ORGANIZATION_DATASOURCE_PROVIDER = 'OrganizationDataSource';