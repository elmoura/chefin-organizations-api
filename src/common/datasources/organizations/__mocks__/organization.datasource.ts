import { injectable } from 'inversify';
import { Organization } from '../../../entities/implementations/organization.entity';
import { IOrganizationDataSource } from '../types/organization-datasouce.interface';

export const MOCKED_ORGANIZATION: Organization = {
  id: 'mocked_id',
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
      id: MOCKED_ORGANIZATION.id,
    };
  }

  async findById(organizationId: string): Promise<Organization | null> {
    return {
      ...MOCKED_ORGANIZATION,
      id: organizationId,
    };
  }

  async updateOne(
    organizationId: string,
    payload: Partial<Organization>
  ): Promise<Partial<Organization>> {
    return {
      ...payload,
      id: organizationId,
    };
  }
}
