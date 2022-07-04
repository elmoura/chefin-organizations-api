import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from '@common/datasources/organizations/types/organization-datasouce.interface';
import {
  IUserDataSource,
  USER_DATASOURCE_PROVIDER,
} from '@common/datasources/users/types/user-datasouce.interface';
import {
  CreateUserUseCase,
  CREATE_USER_USE_CASE_PROVIDER,
} from '@modules/users/core/create-user.usecase';
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
    private organizationDataSource: IOrganizationDataSource
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

    const createdUser = await this.createUserUseCase.execute({
      ...payload.user,
      organizationId: createdOrganization.id,
    });

    await this.organizationDataSource.updateOne(createdOrganization.id, {
      organizationRepresentantId: createdUser.id,
    });

    return {
      ...createdOrganization,
      user: createdUser,
    };
  }
}
