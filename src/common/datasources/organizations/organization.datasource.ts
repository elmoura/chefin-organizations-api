import { DATASOURCE_PROVIDER } from '@src/database/database.module';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { Organization } from '../../entities/organization.entity';
import { IOrganizationDataSource } from './types/organization-datasource.interface';

@injectable()
export class OrganizationDataSource implements IOrganizationDataSource {
  private organizationRepository: Repository<Organization>;

  constructor(@inject(DATASOURCE_PROVIDER) datasource: DataSource) {
    this.organizationRepository = datasource.getRepository(Organization);
  }

  async findById(organizationId: string): Promise<Organization | null> {
    return this.organizationRepository.findOne({
      where: { organizationId },
    });
  }

  async create(payload: Omit<Organization, '_id'>): Promise<Organization> {
    return this.organizationRepository.save(payload);
  }

  async updateOne(
    organizationId: string,
    payload: Partial<Organization>
  ): Promise<Partial<Organization>> {
    return this.organizationRepository.save({
      ...payload,
      id: organizationId,
    });
  }
}
