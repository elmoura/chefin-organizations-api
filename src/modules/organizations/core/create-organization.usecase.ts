import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from '@common/datasources/organizations/types/organization-datasource.interface';
import {} from '@common/datasources/users/types/user-datasouce.interface';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE_PROVIDER,
} from '@modules/users/core/create-user.usecase';
import { ORGANIZATION_LOCATION_DATASOURCE_PROVIDER } from '@common/datasources/organizations/types/organization-location-datasource';
import { OrganizationLocationDataSource } from '@common/datasources/organizations/organization-location.datasource';
import { CreateOrganizationInput } from '../models/create-organization-input';
import { CreateOrganizationOutput } from '../models/create-organization-output';

export const CREATE_ORGANIZATION_USE_CASE_PROVIDER =
  'CreateOrganizationUseCase';

@injectable()
export class CreateOrganizationUseCase
  implements IBaseUseCase<CreateOrganizationInput, CreateOrganizationOutput>
{
  constructor(
    @inject(CREATE_USER_USE_CASE_PROVIDER)
    private createUserUseCase: CreateUserUseCase,
    @inject(ORGANIZATION_DATASOURCE_PROVIDER)
    private organizationDataSource: IOrganizationDataSource,
    @inject(ORGANIZATION_LOCATION_DATASOURCE_PROVIDER)
    private organizationLocationDataSource: OrganizationLocationDataSource
  ) {}

  /**
   * @todo inserir validações de organização
   */
  async execute(
    payload: CreateOrganizationInput
  ): Promise<CreateOrganizationOutput> {
    const organizationPayload = {
      ...payload,
      user: undefined,
    };

    const createdOrganization = await this.organizationDataSource.create(
      organizationPayload
    );

    // adicionar validação pelo nome

    const { organizationId } = createdOrganization;

    const locations =
      await this.organizationLocationDataSource.saveManyForOrganization(
        organizationId,
        payload.locations
      );

    const createdUser = await this.createUserUseCase.execute({
      ...payload.user,
      organizationId,
    });

    const organizationRepresentantId = createdUser.userId;
    await this.organizationDataSource.updateOne(organizationId, {
      organizationRepresentantId,
    });

    return {
      ...createdOrganization,
      organizationRepresentantId,
      locations,
      user: createdUser,
    };
  }
}
