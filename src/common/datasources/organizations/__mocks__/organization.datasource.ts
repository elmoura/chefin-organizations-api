import { injectable } from 'inversify';
import { Organization } from '@common/entities/organization.entity';
import { IOrganizationDataSource } from '../types/organization-datasource.interface';

export const MOCKED_ORGANIZATION: Organization = {
  organizationId: 'mocked_id',
  name: 'Cazé Lanches',
  businessSegment: 'lanches mto fodaaa',
  organizationRepresentantId: 'mocked_user_id',
  locations: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

@injectable()
export class OrganizationDataSource implements IOrganizationDataSource {
  async create(payload: Omit<Organization, '_id'>): Promise<Organization> {
    return {
      ...payload,
      organizationId: MOCKED_ORGANIZATION.organizationId,
    };
  }

  async findById(organizationId: string): Promise<Organization | null> {
    return {
      ...MOCKED_ORGANIZATION,
      organizationId,
    };
  }

  async updateOne(
    organizationId: string,
    payload: Partial<Organization>
  ): Promise<Partial<Organization>> {
    return {
      ...payload,
      organizationId,
    };
  }
}
