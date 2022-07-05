import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { DATASOURCE_PROVIDER } from '@src/database/database.module';
import { ICustomBaseEntity } from '@common/entities/interfaces/custom-base-entity';
import { IOrganizationLocation } from '@common/entities/interfaces/organization-location';
import { OrganizationLocation } from '@common/entities/organization-location.entity';
import { IOrganizationLocationDataSource } from './types/organization-location-datasource';

@injectable()
export class OrganizationLocationDataSource
  implements IOrganizationLocationDataSource
{
  private organizationLocationRepository: Repository<OrganizationLocation>;

  constructor(@inject(DATASOURCE_PROVIDER) datasource: DataSource) {
    this.organizationLocationRepository =
      datasource.getRepository(OrganizationLocation);
  }

  async findByOrganizationId(
    organizationId: string
  ): Promise<IOrganizationLocation[]> {
    return this.organizationLocationRepository.find({
      where: { organizationId },
    });
  }

  saveManyForOrganization(
    organizationId: string,
    locations: Omit<
      IOrganizationLocation,
      keyof ICustomBaseEntity | 'organizationId'
    >[]
  ): Promise<IOrganizationLocation[]> {
    const locationsToSave = locations.map((location) => ({
      ...location,
      organizationId,
    }));

    return this.organizationLocationRepository.save(locationsToSave);
  }
}
