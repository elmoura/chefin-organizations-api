import { inject, injectable } from 'inversify';
import { IBaseUseCase } from '@common/utils/base-use-case';
import {
  IUserDataSource,
  USER_DATASOURCE_PROVIDER,
} from '@common/datasources/users/types/user-datasouce.interface';
import {
  IOrganizationDataSource,
  ORGANIZATION_DATASOURCE_PROVIDER,
} from '@common/datasources/organizations/types/organization-datasource.interface';
import { CreateUserInput } from '../models/create-user-input';
import { CreateUserOutput } from '../models/create-user-output';

export const CREATE_USER_USE_CASE_PROVIDER = 'CreateUserUseCase';

@injectable()
export class CreateUserUseCase
  implements IBaseUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    @inject(ORGANIZATION_DATASOURCE_PROVIDER)
    private organizationDataSource: IOrganizationDataSource,
    @inject(USER_DATASOURCE_PROVIDER) private userDataSource: IUserDataSource
  ) {}

  async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    const { email, organizationId } = createUserInput;

    const organizationExists = await this.organizationDataSource.findById(
      organizationId
    );

    if (!organizationExists) {
      throw new Error('a organização informada não existe.');
    }

    const userAlreadyExists = await this.userDataSource.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('já existe um usuário com esse e-mail.');
    }

    const createdUser = await this.userDataSource.createOne(createUserInput);

    return createdUser;
  }
}
